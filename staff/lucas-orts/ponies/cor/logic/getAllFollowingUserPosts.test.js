import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'

getAllFollowingUserPosts("Taguapo", (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})