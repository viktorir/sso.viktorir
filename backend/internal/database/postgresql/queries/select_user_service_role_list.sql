SELECT 
	user_id, 
	(SELECT login FROM users AS users WHERE users.id = list.user_id),
	service_id,
	(SELECT name FROM services AS srvs WHERE srvs.id = list.service_id),
	role_id,
	(SELECT name FROM roles AS rls WHERE rls.id = list.role_id)
FROM user_service_role_list AS list
ORDER BY user_id, service_id, role_id;