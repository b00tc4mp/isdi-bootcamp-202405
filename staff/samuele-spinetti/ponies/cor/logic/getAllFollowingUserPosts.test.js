import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'

getAllFollowingUserPosts('samu', (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})
