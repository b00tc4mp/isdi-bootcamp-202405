curl -v http://localhost:8080/users  -X POST -d '{"name":"Ester","surname":"Colero","email":"ester@colero.com","username":"estercolero","password":"87654321","passwordRepeat":"87654321"}' -H "Content-Type: application/json"