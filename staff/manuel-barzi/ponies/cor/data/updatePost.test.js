import updatePost from './updatePost.js'

const post = {
    id: '1ksy8z2bdn6o',
    author: 'ale',
    date: '11-07-2024',
    caption: 'Hello',
    image: 'https://njebvbeviobvb'
}

updatePost(post => post.id === '1ksy8z2bdn6o', post, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post updated')
})

