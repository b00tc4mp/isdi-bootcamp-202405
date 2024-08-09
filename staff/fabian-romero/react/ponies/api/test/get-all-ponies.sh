# # curl -v http://localhost:8080/users/:userId/name -X GET '{"username":"Fabito","password":"fabi1234"}'

# aquí el userId se tiene que pasar el parametro ID para encontrar al usuario


curl -v http://localhost:8080/posts -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmFlMDA4OGYwMmVlZWFmZTg0ZGI0NjEiLCJpYXQiOjE3MjI2Nzk0NDF9.XMwiSVT08DSKdkzJEH7qhSlwlQ0216D-659878QRvKE"