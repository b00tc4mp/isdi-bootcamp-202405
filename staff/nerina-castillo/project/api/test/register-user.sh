curl -v http://localhost:8080/users -X POST -d '{"name":"julito", "username":"julitocamelas", "role":"label", "email":"julito@camelas.com", "password":"julito123", "passwordRepeat":"julito123"}' -H "Content-Type: application/json"