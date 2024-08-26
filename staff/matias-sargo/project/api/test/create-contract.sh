curl -X POST http://localhost:8080/contracts \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNjOTUyM2ZjOTY2NDc5NWFlNWMzOTIiLCJpYXQiOjE3MjQ2ODQyMzV9.2k87e-M8OeRb1t6lElneipBAslBty8c2aftFrBQl13k" \
    -d '{
        "propertyId": "66cc971efc9664795ae5c396",
        "ownerId": "66cc9523fc9664795ae5c392",
        "tenantId": "66cc36e584c8d8294429e65a",
        "startDate": "2024-09-01T00:00:00.000Z",
        "endDate": "2025-09-01T00:00:00.000Z",
        "price": 1200
    }'