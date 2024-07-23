import updatePost from "./updatePost.js";

const post = {
    id: "abcdefghl",
    author: "lilideponte",
    date: "11-07-2024",
    caption: "Hello Lili",
    image: "https://media2.giphy.com/media/2VYui7kj5C5I4/200.webp?cid=ecf05e47bfmp9wy35qj5daedm8klj8lstrxmmxrn5kup38gw&ep=v1_gifs_search&rid=200.webp&ct=g"
}

updatePost(post => post.id === "abcdefghl", post, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post updated')
})

