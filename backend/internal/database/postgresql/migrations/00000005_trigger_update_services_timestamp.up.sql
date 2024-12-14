CREATE OR REPLACE FUNCTION sso_service.update_services_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_timestamp_trigger
BEFORE UPDATE ON sso_service.services
FOR EACH ROW
EXECUTE FUNCTION sso_service.update_services_timestamp();