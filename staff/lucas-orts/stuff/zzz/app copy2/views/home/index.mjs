import Component from '../Component.mjs'
import Header from './components/Header.mjs'
import PostList from './components/PostList.mjs'
import Footer from './components/Footer.mjs'

const home = new Component(document.body)
const header = new Header
home.add(header)

header.onHomeClick(() => {
    if (!body.has(postList)) {
        if (favPostList && body.has(favPostList))
            body.remove(favPostList)
        else if (followingPostList && body.has(followingPostList))
            body.remove(followingPostList)

        body.add(postList)

        postList.clearPosts()
        postList.listPosts()
    }
})

let favPostList

header.onFavsClick(() => {
    if (!favPostList || body.has(favPostList)) {
        if (body.has(postList))
            body.remove(postList)
        else if (followingPostList && body.has(followingPostList))
            body.remove(followingPostList)

        favPostList = new FavPostList
        body.add(favPostList)

        favPostList.listPosts()
    }
})

let followingPostList

header.onFollowingClick(() => {
    if (!followingPostList || !body.has(followingPostList)) {
        if (body.has(postList))
            body.remove(postList)
        else if (favPostList && body.has(favPostList))
            favPostList && body.remove(favPostList)

        followingPostList = new FollowingUserPostList
        body.add(followingPostList)

        followingPostList.listPosts()
    }
})


const body = new Component(document.createElement('main'))
body.setClassName('view main')
home.add(body)

const postList = new PostList
body.add(postList)

postList.listPosts()

const footer = new Footer
home.add(footer)

footer.onPostCreated(() => {
    postList.clearPosts()
    postList.listPosts()
})