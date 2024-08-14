curl -v -X POST http://localhost:8080/events \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmI3MmI1NTVlZTNjM2RmNGRmN2UzYzgiLCJpYXQiOjE3MjM0NTQ3Mzl9.6QGmGgqXa2UmnBcqjhQUtnf6m4kpTNnCjPZl6ECwqgg" \
-H "Content-Type: application/json" \
-d '{
  "image": "https://media.giphy.com/media/gHbQG42yJMVHy/giphy.gif?cid=ecf05e47avd97k5cxmhrnbrgkinaptz3nbevbd8mrtpulz06&ep=v1_gifs_search&rid=giphy.gif&ct=gnlknvliver",
  "description": "Barrenfields concert",
  "location": {"type": "Point", "coordinates": [40.7128, -74.0060]},
  "startDate": "2024-08-15T10:00:00Z",  
  "endDate": "2024-08-15T12:00:00Z"     
}'