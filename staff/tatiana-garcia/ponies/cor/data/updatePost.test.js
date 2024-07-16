import updatePost from './updatePost.js';

const post = {
    id: "2qgbjm658wk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevjVOWR09WNiBjquXYh83ydHIKCUd_fhafA&s",
    caption: "Nelli",
    author: "tatig",
    date: "2024-07-10T07:31:21.889Z",
    likes: [
        "solomillo",
        "abtg"
    ]
}

updatePost(_post => _post.caption === 'Nelliel', post)
console.log(post)
