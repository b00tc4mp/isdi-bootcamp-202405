import createPost from './createPost.js'

createPost('marti', 'https//nlknvliver', 'Hello manu', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('Post created')
})