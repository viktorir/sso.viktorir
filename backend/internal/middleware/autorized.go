package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"net/http"
	token "sso.viktorir_service/internal/model/token"
	"strings"
)

func Autorized() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		tokenString := ctx.Get("Authorization")

		if tokenString == "" {
			return fiber.NewError(fiber.StatusUnauthorized, "Authorization header missing!")
		}
		if !strings.HasPrefix(tokenString, "Bearer ") {
			return fiber.NewError(fiber.StatusUnauthorized, "Authorization header malformed!")
		}
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")

		accessToken, err := jwt.Parse(tokenString, token.KeyFunc)
		if err != nil {
			return fiber.NewError(http.StatusUnauthorized, err.Error())
		}
		if !accessToken.Valid {
			return fiber.NewError(http.StatusUnauthorized, "Invalid token!")
		}

		return ctx.Next()
	}
}
