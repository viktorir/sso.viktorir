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
		"sso_viktorir",
	}

	/*
		config := Config{
			host:     os.Getenv("PGSQL_HOST"),
			port:     os.Getenv("PGSQL_PORT"),
			user:     os.Getenv("PGSQL_USER"),
			password: os.Getenv("PGSQL_PASSWORD"),
			dbname:   os.Getenv("PGSQL_DBNAME"),
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
	if err != nil {
		return err
	}

	return nil
}
