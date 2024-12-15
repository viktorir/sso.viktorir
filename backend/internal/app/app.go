package app

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
	"sso.viktorir_service/internal/database/postgresql"
	"sso.viktorir_service/internal/router"
)

func Run() {
	//ctx := context.Background()

	err := postgresql.Connect()
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Postgresql connect!")
	/*err = redis.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Redis connect!")*/

	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
	})
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost,http://localhost:8080,http://localhost:8081,http://localhost:8082,http://localhost:8083",
	}))

	router.Setup(app)

	log.Fatal(app.Listen(":8082"))
}
