SELECT 
	list.service_id,
	srv.name,
	list.roles_id,
	rls.name,
	list.default_value
FROM sso_service.service_role_default_list AS list
JOIN sso_service.services AS srv ON list.service_id = srv.id
JOIN sso_service.roles AS rls ON list.roles_id = rls.id;