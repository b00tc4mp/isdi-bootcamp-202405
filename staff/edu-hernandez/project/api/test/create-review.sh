curl -v http://localhost:8080/events/reviews -X POST -d '{"author":"66fbe30902176ae20eaf64f9","eventId":"66fd2813dcee4393a2e0120b","rating":5,"comment":"This is a test review from API"}' -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmZiZTMwOTAyMTc2YWUyMGVhZjY0ZjkiLCJpYXQiOjE3Mjc4NzkyMDZ9.q0T01FWuxBj4wgs2gw80GrB1KZZLh5EFceCzwXhVSCE" -H "Content-Type: application/json"