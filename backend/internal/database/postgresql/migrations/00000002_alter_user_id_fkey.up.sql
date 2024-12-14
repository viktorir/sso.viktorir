ALTER TABLE sso_service.user_service_role_list
    DROP CONSTRAINT user_service_role_list_user_id_fkey,
    ADD CONSTRAINT user_service_role_list_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES sso_service.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;