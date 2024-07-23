import getAllPoniesPosts from './getAllPoniesPosts.js'

getAllPoniesPosts("Fabito", (error, posts) => {
    if (error) {
        console.error(error)
    }

    console.log(posts)
})


getAllPoniesPosts("Valito", (error, posts) => {
    if (error) {
        console.error(error)
    }

    console.log(posts)
})