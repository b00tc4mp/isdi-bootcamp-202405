curl -v http://localhost:8080/comments/66c5a6e43209c6a98eceb4cb -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmM1YTZiZDMyMDljNmE5OGVjZWI0YzciLCJpYXQiOjE3MjQyMjkzMTJ9.IEUTpGvMINh74oYnw8U3XQ1gWKSYk3kw46dim4HcGMc" -d '{"text":"help2"}' -H "Content-Type: application/json"