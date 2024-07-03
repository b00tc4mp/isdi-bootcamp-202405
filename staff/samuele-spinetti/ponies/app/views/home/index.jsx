import logic from '../../logic/index.mjs'

import Header from './components/Header'
import PostList from './components/PostList'
import Footer from './components/Footer'

const Component = React.Component

class Home extends Component {
    constructor() {
        super()

        try {
            const post = logic.getAllPosts()

            this.state = { post }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleLogoutClick() {
        try {
            logic.logoutUser()

            location.href = '../login'
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <>
            <Header />

            <main className="view main">
                <PostList />
            </main>

            <Footer />
        </>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Home />)

/*const home = new Component(document.body)
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
    if (!favPostList || !body.has(favPostList)) {
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

header.onFollowClick(() => {
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
})*/