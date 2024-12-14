ALTER TABLE sso_service.services
RENAME COLUMN updateed_at TO updated_at;

ALTER TABLE sso_service.users
RENAME COLUMN updateed_at TO updated_at;

ALTER TABLE sso_service.roles
RENAME COLUMN updateed_at TO updated_at;

ALTER TABLE sso_service.service_role_default_list
RENAME COLUMN updateed_at TO updated_at;

ALTER TABLE sso_service.user_service_role_list
RENAME COLUMN updateed_at TO updated_at;