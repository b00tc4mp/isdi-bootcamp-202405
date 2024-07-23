import updatePost from './updatePost.js'

const post = {
    author: "Fabito",
    caption: "TOT EL DIA!!",
    date: "2024-07-10T12:42:54.986Z",
    id: "gho3apb3njs",
    image: "https://media.tenor.com/LLTYGBtru5kAAAAM/mila-stauffer-whatever.gif",
    likes: ["Fabito"]

}

const post2 = {
    author: "Fabito",
    caption: "...",
    date: "2024-07-10T12:43:42.336Z",
    id: "pl5k9ddmc68",
    image: "https://media.tenor.com/0VuncPcO_yIAAAAM/hide-the-simpsons.gif",
    likes: ["Fabito", "Valito"]
}

const post3 = {
    author: "Valito",
    caption: "tiki tiki",
    date: "2024-07-10T12:47:25.218Z",
    id: "mi8drcuyseo",
    image: "https://media.tenor.com/lhUSFl0CnpEAAAAM/frenchie-french.gif",
    likes: ["Fabito"]
}

const post4 = {
    author: "Fabito",
    caption: "Tati <3",
    date: "024-07-10T17:57:01.953Z",
    id: "57u7boklq04",
    image: "ttps://media.tenor.com/OrWIV_jmwE0AAAAM/heart-i-love-you.gif",
    likes: ["Fabito"]
}


const post5 = {
    author: "Valito",
    caption: "ÑamÑam",
    date: "2024-07-11T09:41:57.634Z",
    id: "gud3txmwlqo",
    image: "https://media.tenor.com/u3QduFHVtJ8AAAAM/tacos-dog.gif",
    likes: ["Fabito"]
}


updatePost(post => post.id === "gho3apb3njs", post)
updatePost(post => post.id === "pl5k9ddmc68", post2)
updatePost(post => post.id === "mi8drcuyseo", post3)
updatePost(post => post.id === "57u7boklq04", post4)
updatePost(post => post.id === "gud3txmwlqo", post5)