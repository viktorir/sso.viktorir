CREATE TABLE IF NOT EXISTS roles
(
    id serial NOT NULL,
    name varchar(127) NOT NULL UNIQUE,
    description text,
	deleted_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz,

    CONSTRAINT roles_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS services
(
    id serial NOT NULL,
    name varchar(255) NOT NULL UNIQUE,
    description text,
    domain text,
    deleted_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz,

    CONSTRAINT services_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users
(
    id serial NOT NULL,
    login varchar(127) NOT NULL UNIQUE,
    phone_number varchar(15) NOT NULL UNIQUE,
    email varchar(255) UNIQUE,
    password_hash varchar(255) NOT NULL,
    first_name varchar(255),
    last_name varchar(255),
    father_name varchar(255),
    deleted_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz,

    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS groups
(
    id serial NOT NULL,
    name varchar(127) NOT NULL UNIQUE,
    description text,
    deleted_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz,

    CONSTRAINT groups_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_groups
(
    user_id bigint NOT NULL,
    group_id bigint NOT NULL,
    deleted_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz,

    CONSTRAINT user_groups_pkey PRIMARY KEY (user_id, group_id),
    CONSTRAINT user_groups_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT user_groups_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES groups (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS group_roles
(
    group_id bigint NOT NULL,
    service_id bigint NOT NULL,
    role_id bigint NOT NULL,
    deleted_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz,

    CONSTRAINT group_roles_pkey PRIMARY KEY (group_id, service_id, role_id),
    CONSTRAINT group_roles_group_id_fkey FOREIGN KEY (group_id)
        REFERENCES groups (id) ON DELETE CASCADE,
    CONSTRAINT group_roles_service_id_fkey FOREIGN KEY (service_id)
        REFERENCES services (id) ON DELETE CASCADE,
    CONSTRAINT group_roles_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES roles (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_service_role_list
(
    user_id bigint NOT NULL,
    service_id bigint NOT NULL,
    role_id bigint NOT NULL,
    deleted_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz,
    CONSTRAINT user_service_role_list_pkey PRIMARY KEY (service_id, role_id, user_id),
    CONSTRAINT user_service_role_list_roles_id_fkey FOREIGN KEY (role_id)
        REFERENCES roles (id) ON DELETE CASCADE,
    CONSTRAINT user_service_role_list_service_id_fkey FOREIGN KEY (service_id)
        REFERENCES services (id) ON DELETE CASCADE,
    CONSTRAINT user_service_role_list_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
);