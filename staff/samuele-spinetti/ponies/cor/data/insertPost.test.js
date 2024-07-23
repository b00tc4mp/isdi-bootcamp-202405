import insertPost from './insertPost.js'

const post = {
    id: "abcdefghm",
    author: "ale",
    date: "10-07-2024",
    caption: "Hello",
    image: "https://njebvbeviobvb"
}

insertPost(post, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('Post inserted')
})