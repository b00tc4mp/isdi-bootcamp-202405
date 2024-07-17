import updatePost from './updatePost.js'

const post = {
    id: "abcdefghl",
    author: "ale",
    date: "11-07-2024",
    caption: "Hello",
    image: "https://njebvbeviobvb"
}

updatePost(post => post.id === "abcdefghl", post)

