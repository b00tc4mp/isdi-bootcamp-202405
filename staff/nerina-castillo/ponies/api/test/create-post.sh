curl -v -X POST http://localhost:8080/posts -H "Authorization: Basic julitoCamelas" -d '{"image": "https://media.giphy.com/media/Ty9Sg8oHghPWg/giphy.gif?cid=790b7611k1isspkgnlxqcvk07kqq26fe137qherkek4mavvf&ep=v1_gifs_trending&rid=giphy.gif&ct=g", "caption": "This is a caption"}' -H "Content-Type: application/json"