package user

import (
	"sso.viktorir_service/internal/database"
)

type User struct {
	Id           int    `json:"id"`
	Login        string `json:"login"`
	PasswordHash string `json:"password_hash"`
	PhoneNumber  string `json:"phone_number"`
	Email        string `json:"email"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	FatherName   string `json:"father_name"`
}

func Create(login, passwordHash, phoneNumber, email, firstName, lastName, fatherName string) (id int64, err error) {
	query := "INSERT INTO users (login, password_hash, phone_number, email, first_name, last_name, father_name) VALUES ($1, $2, $3, $4, $5, $6, $7) returning id;"
	err = database.Sql.QueryRow(query, login, passwordHash, phoneNumber, email, firstName, lastName, fatherName).Scan(&id)
	query = "INSERT INTO user_service_role_list (user_id, service_id, role_id) VALUES ($1, (SELECT id FROM services WHERE name = 'sso.viktorir'), (SELECT id FROM roles WHERE name = 'is_user'))"
	_, err = database.Sql.Exec(query, id)
	return
}

func FindByID(id int) (u User, err error) {
	err = database.Sql.QueryRow("SELECT id, login, password_hash, phone_number, email, first_name, last_name, father_name FROM users WHERE id = $1", id).Scan(&u.Id, &u.Login, &u.PasswordHash, &u.PhoneNumber, &u.Email, &u.FirstName, &u.LastName, &u.FatherName)
	return
}

func FindByLogin(login string) (u User, err error) {
	err = database.Sql.QueryRow("SELECT id, login, password_hash, phone_number, email, first_name, last_name, father_name FROM users WHERE login = $1", login).Scan(&u.Id, &u.Login, &u.PasswordHash, &u.PhoneNumber, &u.Email, &u.FirstName, &u.LastName, &u.FatherName)
	return
}

func (u User) GetRoles() (roleMap map[string][]string, err error) {
	roleMap = make(map[string][]string)
	rows, err := database.Sql.Query("SELECT (SELECT name FROM services WHERE services.id = list.service_id) AS service, (SELECT name FROM roles WHERE roles.id = list.role_id) AS role FROM user_service_role_list AS list WHERE user_id = $1;", u.Id)
	if err != nil {
		return
	}
	for rows.Next() {
		var (
			service string
			role    string
		)
		err = rows.Scan(&service, &role)
		if err != nil {
			return
		}

		roleMap[service] = append(roleMap[service], role)
	}
	return
}
