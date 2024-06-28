import Component from '../Component.mjs'
import Header from './components/Header.mjs'
import PostList from './components/PostList.mjs'
import FavPostList from './components/FavPostList.mjs'
import Footer from './components/Footer.mjs'

const home = new Component(document.body)
const header = new Header
home.add(header)

header.onHomeClick(() => {
    if (favPostList && body.has(favPostList)) {
        body.remove(favPostList)
        body.add(postList)

        postList.clearPosts()
        postList.listPosts()
    }
})

let favPostList

header.onFavsClick(() => {
    if (body.has(postList)) {
        body.remove(postList)

        favPostList = new FavPostList
        body.add(favPostList)

        favPostList.listPosts()
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