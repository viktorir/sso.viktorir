package redis

import (
	"context"
	"github.com/redis/go-redis/v9"
	"sso.viktorir_service/internal/database"
)

func Connect(ctx context.Context) (err error) {
	database.Redis = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	err = database.Redis.Ping(ctx).Err()
	return
}
