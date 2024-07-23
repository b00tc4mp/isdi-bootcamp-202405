import deletePost from './deletePost.js'

deletePost('marti', 'ksu6h1uon7k', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('Post deleted')
})