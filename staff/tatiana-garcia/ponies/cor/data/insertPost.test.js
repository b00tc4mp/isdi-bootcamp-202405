import insertPost from './insertPost.js'

const post = {
    id: "2qgbjm658wk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevjVOWR09WNiBjquXYh83ydHIKCUd_fhafA&s",
    caption: "Nelliel",
    author: "tatianag",
    date: "2024-07-10T07:31:21.889Z"
}

insertPost(post, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post inserted')
})
