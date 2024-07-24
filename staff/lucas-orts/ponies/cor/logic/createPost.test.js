import createPost from './createPost.js'

createPost("Cacatua", "https//nlknvliver", "Soy yo", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post created')
})