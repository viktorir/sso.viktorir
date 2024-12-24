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
		AllowOrigins:     "https://sso.viktorir.ru,https://pcconf.viktorir.ru,https://file.viktorir.ru,http://localhost:8080",
	}))

	router.Setup(app)

	log.Fatal(app.Listen(":8081"))
}
