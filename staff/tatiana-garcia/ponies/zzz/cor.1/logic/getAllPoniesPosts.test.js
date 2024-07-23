import getAllPoniesPosts from './getAllPoniesPosts.js';

getAllPoniesPosts("benitocamelas", (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})
