curl -v http://localhost:8080/users -X POST -d '{"name":"Lili","surname":"De Ponte","email":"lili@deponte.com","username":"lilideponte","password":"123456789","passwordRepeat":"123456789"}' -H "Content-Type: application/json"