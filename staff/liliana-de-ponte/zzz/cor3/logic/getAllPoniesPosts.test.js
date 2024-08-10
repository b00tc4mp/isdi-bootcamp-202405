import getAllPoniesPosts from "./getAllPoniesPosts.js"

getAllPoniesPosts("lilideponte", (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})
