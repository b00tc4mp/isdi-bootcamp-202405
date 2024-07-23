import updatePost from './updatePost.js';

const post = {
    id: "qvqbt790bs0",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR3cd9Zo1f_nPGQEAUhN2r-VRf05szjz84Qv1Utrto7tMC-f0Ji",
    caption: "ardilla",
    author: "abtg",
    date: "2024-07-20T15:14:38.538Z",
    likes: [
        "abtg"
    ]
}

updatePost(_post => _post.caption === 'Nelliel', post, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post updated')
})

