package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"log"
	token "sso.viktorir_service/internal/model/token"
	"time"
)

type refreshRequest struct {
	RefreshToken string `json:"refresh_token"`
}

func Refresh(ctx *fiber.Ctx) error {
	req := new(refreshRequest)
	err := ctx.BodyParser(req)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	claims := jwt.MapClaims{}
	_, err = jwt.ParseWithClaims(req.RefreshToken, claims, token.KeyFunc)

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

	log.Println(claims)
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
		Name:    "refresh_token",
		Value:   string(refresh),
		Expires: refExp,
	})
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"access_token": access, "refresh_token": refresh})
}

func GetRefresh(ctx *fiber.Ctx) error {
	refreshToken := ctx.Cookies("refresh_token")
	if refreshToken == "" {
		return fiber.NewError(fiber.StatusUnauthorized, "No refresh token found!")
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"refresh_token": refreshToken})
}
