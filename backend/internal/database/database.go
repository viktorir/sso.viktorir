package database

import (
	"database/sql"
	"github.com/redis/go-redis/v9"
)

var (
	Sql   *sql.DB
	Redis *redis.Client
)
