import updatePost from './updatePost.js'

const post = {

    author: "Valito",
    caption: "tiki tiki",
    date: "2024-07-10T12:47:25.218Z",
    id: "mi8drcuyseo",
    image: "https://media.tenor.com/lhUSFl0CnpEAAAAM/frenchie-french.gif"

}

updatePost(post => post.id === "mi8drcuyseo", post)