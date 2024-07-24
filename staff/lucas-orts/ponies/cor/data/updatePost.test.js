import updatePost from "./updatePost.js"

const post = {
    id: "2gouhl5uylg0",
    image: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/4/4e/latest/20191009134017/Ponyta_de_Galar.png/1200px-Ponyta_de_Galar.png",
    caption: "perrito faldero",
    author: "postulento",
    date: "2024-07-10T13:36:38.857Z",
    likes: []
}

updatePost(post => post.id === '2gouhl5uylg0', post, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('Post updated')
})

