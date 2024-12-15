package service

import (
	"database/sql"
	"sso.viktorir_service/internal/database"
)

type Service struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Domain      string `json:"domain"`
}

func Find() (s []Service, err error) {
	rows, err := database.Sql.Query("SELECT id, name, description, domain FROM services")
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var (
			service     Service
			description sql.NullString
		)
		err = rows.Scan(&service.Id, &service.Name, &description, &service.Domain)
		if err != nil {
			return nil, err
		}
		if description.Valid {
			service.Description = description.String
		} else {
			service.Description = ""
		}

		s = append(s, service)
	}
	return
}

func FindByName() {

}
