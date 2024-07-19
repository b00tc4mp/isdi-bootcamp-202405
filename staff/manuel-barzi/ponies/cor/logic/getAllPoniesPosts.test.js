import getAllPoniesPosts from './getAllPoniesPosts.js'

getAllPoniesPosts('samu', (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})