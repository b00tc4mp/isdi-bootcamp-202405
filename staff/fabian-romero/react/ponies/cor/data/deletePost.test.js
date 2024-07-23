import deletePost from "./deletePost.js"


const post1 = {
    author: "Valito",
    caption: "ÑamÑam!",
    date: "2024-07-11T09:41:57.634Z",
    id: "gud3txmwlqo",
    image: "https://media.tenor.com/u3QduFHVtJ8AAAAM/tacos-dog.gif"
}

deletePost(post => post.id === post1) // aqui puedo poner cualquer dato.. la logica es que me lo va a eliminar
