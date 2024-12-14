CREATE OR REPLACE FUNCTION sso_service.update_users_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp_trigger
BEFORE UPDATE ON sso_service.users
FOR EACH ROW
EXECUTE FUNCTION sso_service.update_users_timestamp();
--
CREATE OR REPLACE FUNCTION sso_service.update_roles_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_roles_timestamp_trigger
BEFORE UPDATE ON sso_service.roles
FOR EACH ROW
EXECUTE FUNCTION sso_service.update_roles_timestamp();
--
CREATE OR REPLACE FUNCTION sso_service.update_service_role_default_list_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_service_role_default_list_timestamp_trigger
BEFORE UPDATE ON sso_service.service_role_default_list
FOR EACH ROW
EXECUTE FUNCTION sso_service.update_service_role_default_list_timestamp();
--
CREATE OR REPLACE FUNCTION sso_service.update_user_service_role_list_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_service_role_list_timestamp_trigger
BEFORE UPDATE ON sso_service.user_service_role_list
FOR EACH ROW
EXECUTE FUNCTION sso_service.update_user_service_role_list_timestamp();