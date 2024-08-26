curl -X POST http://localhost:8080/properties \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNjOTUyM2ZjOTY2NDc5NWFlNWMzOTIiLCJpYXQiOjE3MjQ2ODM2MDN9.zjb08W1WRnPJ5yYN2I4s4tCfII-92eNBOoQevj6krB0" \
    -d '{
        "title": "Beautiful apartment in the city center",
        "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        "description": "This is a beautiful apartment located in the heart of the city.",
        "address": "123 Main St, New York, NY",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "price": 2500,
        "type": "apartment"
    }'
