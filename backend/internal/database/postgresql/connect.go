package postgresql

import (
	"database/sql"
	"fmt"
	"sso.viktorir_service/internal/database"

	_ "github.com/jackc/pgx/v5/stdlib"
)

type Config struct {
	host     string
	port     string
	user     string
	password string
	dbname   string
}

func Connect() (err error) {

	config := Config{
		"localhost",
		"5432",
		"postgres",
		"235711",
		"test",
	}

	/*
		config := Config{
			host:     os.Getenv("PSQL_HOST"),
			port:     os.Getenv("PSQL_PORT"),
			user:     os.Getenv("PSQL_USER"),
			password: os.Getenv("PSQL_PASSWORD"),
			dbname:   os.Getenv("PSQL_DBNAME"),
		}
	*/

	database.Sql, err = sql.Open("pgx", fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.host,
		config.port,
		config.user,
		config.password,
		config.dbname,
	))
	if err != nil {
		return err
	}

	err = database.Sql.Ping()
	return err
}
