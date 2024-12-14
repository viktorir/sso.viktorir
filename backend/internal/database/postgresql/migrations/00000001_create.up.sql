CREATE TABLE sso_service.services (
	id BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	description TEXT,
	domain TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
	updateed_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
)

CREATE TABLE sso_service.users (
	id BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
	login VARCHAR(127) NOT NULL UNIQUE,
	phone_number VARCHAR(15) NOT NULL UNIQUE,
	email VARCHAR(255) UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	father_name VARCHAR(255),
	created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
	updateed_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
);

CREATE TABLE sso_service.roles (
	id BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
	name VARCHAR(127) NOT NULL UNIQUE,
	description TEXT,
	created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
	updateed_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
);

CREATE TABLE sso_service.service_role_default_list (
	service_id BIGINT NOT NULL REFERENCES sso_service.services(id),
	roles_id BIGINT NOT NULL REFERENCES sso_service.roles(id),
	default_value BOOL NOT NULL DEFAULT 'false',
	created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
	updateed_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
	
	PRIMARY KEY(service_id, roles_id)
);

CREATE TABLE sso_service.user_service_role_list (
	user_id BIGINT NOT NULL REFERENCES sso_service.services(id),
	service_id BIGINT NOT NULL REFERENCES sso_service.services(id),
	roles_id BIGINT NOT NULL REFERENCES sso_service.roles(id),
	value BOOL NOT NULL DEFAULT 'false',
	created_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
	updateed_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp,
	
	PRIMARY KEY(service_id, roles_id, user_id)
)