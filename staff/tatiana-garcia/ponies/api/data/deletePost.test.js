import deletePost from './deletePost.js'

const post1 = {

    id: "j20x3n4r37k",
    image: "https://content.nationalgeographic.com.es/medio/2022/12/12/ardilla-2_d0a43045_221212154055_310x310.jpg",
    caption: "ardilla",
    author: "solomillo",
    date: "2024-07-10T20:47:28.365Z",
    likes: []
}

deletePost(post => post.id === post1.id)