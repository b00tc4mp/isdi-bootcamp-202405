import updatePost from './updatePost.js'

const post = {
    id: "randomId_3",
    author: "ale",
    date: "11-07-2024",
    caption: "updatePost_Post",
    image: "https://RandomUrl"
}

updatePost(post => post.id === "randomId_3", post)

