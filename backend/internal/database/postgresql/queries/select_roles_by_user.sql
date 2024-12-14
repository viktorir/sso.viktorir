SELECT 
	(SELECT name AS service FROM sso_service.services AS srvs WHERE srvs.id = list.service_id), 
	string_agg((SELECT name FROM sso_service.roles AS rls WHERE rls.id = list.role_id), ';')
FROM sso_service.user_service_role_list AS list
WHERE user_id = 1
GROUP BY service_id;