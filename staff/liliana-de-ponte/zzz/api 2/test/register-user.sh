curl -v http://localhost:8080/users -X POST -d '{"name":"Lucas","surname":"Ortz","email":"lucas@ortz.com","username":"lucasortz","password":"123456789","passwordRepeat":"123456789"}' -H "Content-Type: application/json"