package handler

import (
	"database/sql"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"log"
	"sso.viktorir_service/internal/model/token"
	"sso.viktorir_service/internal/model/user"
)

type signInReq struct {
	Login       string `json:"login"`
	Password    string `json:"password"`
	RedirectURL string `json:"redirect_url"`
}

type signUpReq struct {
	Login       string `json:"login"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Password    string `json:"password"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	FatherName  string `json:"father_name"`
	RedirectURL string `json:"redirect_url"`
}

func SignUp(ctx *fiber.Ctx) error {
	req := new(signUpReq)
	err := ctx.BodyParser(req)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	_, err = user.FindByLogin(req.Login)
	if err != sql.ErrNoRows {
		if err != nil {
			return err
		}
		return fiber.NewError(fiber.StatusBadRequest, "A user with this login already exists!")
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	id, err := user.Create(req.Login, string(hashPassword), req.PhoneNumber, req.Email, req.FirstName, req.LastName, req.FatherName)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"id": id})
}

func SignIn(ctx *fiber.Ctx) error {
	req := new(signInReq)
	err := ctx.BodyParser(req)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	candidate, err := user.FindByLogin(req.Login)
	if err == sql.ErrNoRows {
		return fiber.NewError(fiber.StatusBadRequest, "User not found!")
	}
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if err = bcrypt.CompareHashAndPassword([]byte(candidate.PasswordHash), []byte(req.Password)); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Password invalid!")
	}

	roles, err := candidate.GetRoles()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	payLoad := map[string]interface{}{"roles": roles, "login": candidate.Login}

	access, refresh, err := token.GenerateFew(candidate.Id, payLoad)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	refExp, err := refresh.GetExpiration()
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	ctx.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    string(refresh),
		Expires:  refExp,
		HTTPOnly: true,
		Secure:   true,
	})

	log.Println(req.RedirectURL)
	if req.RedirectURL == "" {
		return ctx.Status(fiber.StatusOK).JSON(fiber.Map{"access_token": access})
	}
	return ctx.Redirect(req.RedirectURL)
}

func SignOut(ctx *fiber.Ctx) error {
	refreshToken := ctx.Cookies("refresh_token", "")
	if refreshToken == "" {
		return fiber.NewError(fiber.StatusUnauthorized, "Refresh token not found in Cookies!")
	}

	ctx.Cookie(&fiber.Cookie{
		Name:     "refresh_token",
		Value:    "",
		MaxAge:   -1,
		HTTPOnly: true,
		Secure:   true,
	})
	return ctx.SendStatus(fiber.StatusOK)
}
