import updatePost from './updatePost.js';

const post = {
    id: "olzkh3ya8hs",
    img: "https://sm.ign.com/t/ign_es/feature/t/the-15-bes/the-15-best-nicolas-cage-movies_ugq2.1280.jpg",
    caption: "My Nicholas",
    author: "Eden",
    date: "2024-06-27T15:04:39.181Z",
    likes: ["Eden", "samu"]
}

updatePost((_post => _post.id === post.id), post);