package router

import (
	"os"
	"sso.viktorir_service/internal/handler"
	"sso.viktorir_service/internal/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Setup(app *fiber.App) {
	api := app.Group("/api", logger.New(logger.Config{
		Format:     "{\"time\":\"${time}\",\"method\":\"${method}\",\"path\":\"${path}\",\"status\":${status},\"user-agent\":\"${ua}\",\"route\":\"${route}\",\"error\":\"${error}\"}\n",
		TimeFormat: "02/Jan/2006:15:04:05",
		TimeZone:   "Local",
		Output:     os.Stdout,
	}))

	v1 := api.Group("/v1")
	v1.Get("/ping", handler.Pong)

	v1.Post("/signon", handler.SignUp)   // Registration
	v1.Post("/signin", handler.SignIn)   // Authorization
	v1.Post("/signout", handler.SignOut) // Logout

	v1.Post("/refresh", handler.Refresh)
	v1.Get("/refresh", handler.GetRefresh)

	v1.Get("/user", middleware.Autorized(), handler.GetUser)

	v1.Get("/service", middleware.Autorized(), handler.GetServices)
}
