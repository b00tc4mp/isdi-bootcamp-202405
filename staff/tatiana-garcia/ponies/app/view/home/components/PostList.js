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
            const posts = getAllPosts()

            const self = this

            posts.forEach(function (_post) {
                const post = new Post(_post)

                post.onPostDeleted(function () {

                    self.clearPosts()
                    self.listPosts()
                })

                post.onPostCaptionEdited(function () {

                    self.clearPosts()
                    self.listPosts()
                })

                self.add(post)
            })
        } catch (error) {

            alert(error.message)
        }
    }
}