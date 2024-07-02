import Component from '../../Component.mjs'
import Post from './Post.mjs'

import logic from '../../../logic/index.mjs'

class PostList extends Component {
    constructor() {
        super(document.createElement('section'))

        this.setClassName('post-list')
    }

    clearPosts() {
        for (let i = this.container.children.length - 1; i > -1; i--) {
            const child = this.container.children[i]

            this.container.removeChild(child)
        }
    }

    listPosts() {
        try {
            const posts = logic.getAllPosts()

            posts.forEach(_post => {
                const post = new Post(_post)

                post.onPostDeleted(() => {
                    this.clearPosts()
                    this.listPosts()
                })

                post.onPostCaptionEdited(() => {
                    this.clearPosts()
                    this.listPosts()
                })

                post.onPostLikeToggled(() => {
                    this.clearPosts()
                    this.listPosts()
                })

                post.onPostFavToggled(() => {
                    this.clearPosts()
                    this.listPosts()
                })

                post.onFollowUserToggled(() => {
                    this.clearPosts()
                    this.listPosts()
                })

                this.add(post)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}

export default PostList