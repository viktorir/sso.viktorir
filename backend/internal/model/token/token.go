package token

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"time"
)

var (
	SecretKey = []byte("secret")
	Method    = jwt.SigningMethodHS256
)

type Token string

func GenerateFew(userId int, payLoad map[string]interface{}) (access Token, refresh Token, err error) {
	err = access.GenerateAccess(userId, payLoad)
	err = refresh.GenerateRefresh(userId, payLoad)
	return
}

func (t *Token) GetExpiration() (exp time.Time, err error) {
	token, err := jwt.Parse(string(*t), KeyFunc)
	if err != nil {
		return time.Time{}, err
	}
	if !token.Valid {
		return time.Time{}, fmt.Errorf("token invalid")
	}
	claims := token.Claims.(jwt.MapClaims)
	return time.Unix(int64(claims["exp"].(float64)), 0), nil
}

func (t *Token) GenerateAccess(userId int, payLoad map[string]interface{}) error {
	accessExp := time.Now().Add(time.Minute * 10)
	token, err := generate(userId, payLoad, accessExp)
	if err != nil {
		return err
	}
	*t = Token(token)
	return nil
}

func (t *Token) GenerateRefresh(userId int, payLoad map[string]interface{}) error {
	refreshExp := time.Now().Add(time.Hour * 24 * 30)
	token, err := generate(userId, payLoad, refreshExp)
	if err != nil {
		return err
	}
	*t = Token(token)
	return nil
}

func KeyFunc(t *jwt.Token) (interface{}, error) {
	if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fiber.NewError(fiber.StatusUnauthorized, "The token signing method is incorrect!")
	}
	return SecretKey, nil
}

func generate(userId int, payLoad map[string]interface{}, expiration time.Time) (token string, err error) {
	claims := jwt.MapClaims{}
	for key, value := range payLoad {
		claims[key] = value
	}
	claims["user_id"] = userId
	claims["exp"] = expiration.Unix()
	token, err = jwt.NewWithClaims(Method, claims).SignedString(SecretKey)
	return
}
