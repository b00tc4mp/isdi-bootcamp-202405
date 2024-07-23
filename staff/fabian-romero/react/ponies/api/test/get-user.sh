# # curl -v http://localhost:8080/users/:userId/name -X GET '{"username":"Fabito","password":"fabi1234"}'

# aquí el userId se tiene que pasar el parametro ID para encontrar al usuario


curl -v http://localhost:8080/users/Valito/name -X GET -H "Authorization: Basic Valito"