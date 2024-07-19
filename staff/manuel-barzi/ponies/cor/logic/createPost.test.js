import createPost from './createPost.js'

createPost('samu', 'https//nlknvliver', 'Hello manu', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post created')
})