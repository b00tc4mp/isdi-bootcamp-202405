import updatePost from "./updatePost.js";

const post = {
    author: 'maxPower',
    id: "onlstpoafkw",
    image:'https://media.giphy.com/media/XxvOVJFexvJ0IiMhug/giphy.gif?cid=82a1493b5g6eyurrpw46em8emg9mi1n4lrkzvtvclp2lrxqu&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
    caption: 'hey'
}


updatePost(post => post.id === "onlstpoafkw", post)
