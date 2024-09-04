curl -X POST http://localhost:8080/properties \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNjOTUyM2ZjOTY2NDc5NWFlNWMzOTIiLCJpYXQiOjE3MjQ5MTY1NzZ9.pEWv0kyJd61ZbO10WwbCyYvhEno3Mmz2kwCXwH4H86o" \
    -d '{
        "title": "Beautiful apartment malaga",
        "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        "description": "This is a beautiful apartment located in malaga center.",
        "address": "123 malagueta",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "price": 2500,
        "type": "apartment"
    }'
