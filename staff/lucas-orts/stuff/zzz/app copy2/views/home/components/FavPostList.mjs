import Component from '../../Component.mjs'
import Post from './Post.mjs'

import logic from '../../../logic/index.mjs'

class FavPostList extends Component {
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
            const posts = logic.getAllFavPosts()

            const self = this

            posts.forEach(_post => {
                const post = new Post(_post)

                post.onPostDeleted(() => {
                    self.clearPosts()
                    self.listPosts()
                })

                post.onPostCaptionEdited(() => {
                    self.clearPosts()
                    self.listPosts()
                })

                post.onPostLikeToggled(() => {
                    self.clearPosts()
                    self.listPosts()
                })

                post.onPostFavToggled(() => {
                    self.clearPosts()
                    self.listPosts()
                })

                post.onUserFollowToggled(() => {
                    self.clearPosts()
                    self.listPosts()
                })

                self.add(post)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
}

export default FavPostList