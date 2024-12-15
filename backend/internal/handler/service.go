package handler

import (
	"github.com/gofiber/fiber/v2"
	"sso.viktorir_service/internal/model/service"
)

func GetServices(ctx *fiber.Ctx) error {
	services, err := service.Find()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"services": services})
}
