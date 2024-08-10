import insertPost from "./insertPost.js";

const post = {
    id: "abcdefghm",
    author: "lilideponte",
    date: "19-07-2024",
    caption: "Bye",
    image: "https://njebvbeviobvb"
}

insertPost(post, error => {
    if (error) {
        console.error(error)

        return
    }
    console.log('post inserted')
})