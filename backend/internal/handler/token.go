package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	token "sso.viktorir_service/internal/model/token"
	"time"
)

func Refresh(ctx *fiber.Ctx) (err error) {
	refreshToken := ctx.Cookies("refresh_token", "")
	if refreshToken == "" {
		return fiber.NewError(fiber.StatusUnauthorized, "Refresh token not found in Cookies!")
	}

	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(refreshToken, claims, token.KeyFunc)
	if err != nil {
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid refresh token: "+err.Error())
	}

	if exp, ok := claims["exp"].(float64); ok {
		if time.Now().Unix() > int64(exp) {
			return fiber.NewError(fiber.StatusUnauthorized, "Token has expired")
		}
	} else {
		return fiber.NewError(fiber.StatusUnauthorized, "Token does not have an expiration time")
	}

	userID := int(claims["user_id"].(float64))
	userRoles := claims["roles"].(map[string]interface{})
	userLogin := claims["login"].(string)

	payLoad := map[string]interface{}{"roles": userRoles, "login": userLogin}

	access, refresh, err := token.GenerateFew(userID, payLoad)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	refExp, err := refresh.GetExpiration()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	ctx.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    string(refresh),
		Expires:  refExp,
		HTTPOnly: true,
		Secure:   true,
	})
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"access_token": access})
}

func GetRefresh(ctx *fiber.Ctx) error {
	refreshToken := ctx.Cookies("refresh_token")
	if refreshToken == "" {
		return fiber.NewError(fiber.StatusUnauthorized, "No refresh token found!")
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"refresh_token": refreshToken})
}
