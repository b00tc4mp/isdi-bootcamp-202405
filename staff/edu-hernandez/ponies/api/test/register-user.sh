curl -v http://localhost:8080/users -X POST -d '{"name":"Clark","surname":"Kent","email":"clark@kent.com","username":"clark","password":"123123123","passwordRepeat":"123123123"}' -H "Content-Type: application/json"