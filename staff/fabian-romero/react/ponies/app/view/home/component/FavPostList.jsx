import logic from "../../../logic/index.mjs"

const { Component } = React

import Post from './Post.jsx'

class FavPostList extends Component {
    constructor() {
        super()


        FavPostList() {

            try {
                const posts = logic.getAllFavPosts()

                const self = this

                posts.forEach(_post => {
                    const post = new Post(_post)

                    post.onPostDeleted(() => {
                        self.clearPost()
                        self.listPost()
                    })

                    post.ondPostCaptionEdited(() => {
                        self.clearPost()
                        self.listPost()
                    })

                    post.onPostLikeToggled(() => {
                        self.clearPost()
                        self.listPost()
                    })

                    post.onPostFavToggled(() => {
                        self.clearPost()
                        self.listPost()
                    })

                    self.add(post)
                })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }
    }

    render() {
        return <section className="post_loist">
            {this.state.posts.map(post => <post post={post} />)}

        </section>
    }
}

export default FavPostList