curl -X POST http://localhost:8080/contracts \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNjOTUyM2ZjOTY2NDc5NWFlNWMzOTIiLCJpYXQiOjE3MjQ5MTY1NzZ9.pEWv0kyJd61ZbO10WwbCyYvhEno3Mmz2kwCXwH4H86o" \
    -d '{
        "propertyId": "66d023a8c0f08dba8ff88ecd",
        "ownerId": "66cc9523fc9664795ae5c392",
        "tenantId": "66d022358c6be8c8fdaecde5",
        "startDate": "2024-09-01T00:00:00.000Z",
        "endDate": "2025-09-01T00:00:00.000Z",
        "price": 2200
    }'