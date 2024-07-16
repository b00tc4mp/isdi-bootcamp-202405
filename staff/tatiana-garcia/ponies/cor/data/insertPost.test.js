import insertPost from './insertPost.js'

const post = {
    id: "2qgbjm658wk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevjVOWR09WNiBjquXYh83ydHIKCUd_fhafA&s",
    caption: "Nelliel",
    author: "tatianag",
    date: "2024-07-10T07:31:21.889Z",
    likes: ["solomillo", "abtg"]
}

const post2 = {

    id: "89d3b37wl3w",
    image: "https://i.etsystatic.com/17622040/r/il/d20873/4246951701/il_570xN.4246951701_8sqv.jpg",
    caption: "jinx",
    author: "abtg",
    date: "2024-07-10T09:29:10.068Z",
    likes: ["tatig"]
}

const post3 = {

    id: "j20x3n4r37k",
    image: "https://content.nationalgeographic.com.es/medio/2022/12/12/ardilla-2_d0a43045_221212154055_310x310.jpg",
    caption: "ardilla",
    author: "solomillo",
    date: "2024-07-10T20:47:28.365Z",
    likes: []
}


insertPost(post);
insertPost(post2);
insertPost(post3);