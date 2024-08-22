curl -X POST http://localhost:8080/properties \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmM0NTY4OWVjZDY2MjNjYmM5ZTA2YzAiLCJpYXQiOjE3MjQyNDUwMDJ9.ZyH0N7naSi4LO8DL8xCOnY_s65DLBxrkuSCslIzXXww" \
    -d '{
        "title": "Beautiful apartment in the city center",
        "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        "description": "This is a beautiful apartment located in the heart of the city.",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "price": 2500,
        "type": "apartment"
    }'