package handler

import (
	"database/sql"
	"github.com/gofiber/fiber/v2"
	"sso.viktorir_service/internal/model/user"
	"strconv"
)

func GetUser(ctx *fiber.Ctx) error {
	var userInfo = new(user.User)

	id, err := strconv.Atoi(ctx.Query("id", "0"))
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	if id != 0 {
		foundUser, err := user.FindOneByID(id)
		if err == sql.ErrNoRows {
			return fiber.NewError(fiber.StatusBadRequest, "User not found!")
		}
		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}
		userInfo = &foundUser
	}

	loginParam := ctx.Query("login", "")
	if loginParam != "" {
		foundUser, err := user.FindOneByLogin(loginParam)
		if err == sql.ErrNoRows {
			return fiber.NewError(fiber.StatusBadRequest, "User not found!")
		}
		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}
		userInfo = &foundUser
	}
	if userInfo == nil {
		return fiber.NewError(fiber.StatusBadRequest, "Query params is empty!")
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"user": userInfo})
}
