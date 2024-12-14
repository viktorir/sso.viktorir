SELECT 
	user_id, 
	(SELECT login FROM sso_service.users AS users WHERE users.id = list.user_id), 
	service_id,
	(SELECT name FROM sso_service.services AS srvs WHERE srvs.id = list.service_id), 
	role_id,
	(SELECT name FROM sso_service.roles AS rls WHERE rls.id = list.role_id)
FROM sso_service.user_service_role_list AS list
ORDER BY user_id, service_id, role_id;