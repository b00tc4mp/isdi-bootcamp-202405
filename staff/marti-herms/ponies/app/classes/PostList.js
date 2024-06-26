class PostList extends Component {
    constructor(selector) {
        super(selector ? document.querySelector(selector) : document.createElement('section'));
        if (!selector) {
            this.setClassName('post-list');
        }
    }

    clearPosts = () => {
        for (let i = this.getChildren().length - 1; i > -1; i--) {
            const child = this.getChildren()[i];

            this.container.removeChild(child);
        }
    }

    generatePostList = () => {
        try {
            const posts = getAllPosts();

            const self = this;

            posts.forEach((_post) => {
                const post = new Post(_post);

                post.onPostDeleted(() => {
                    self.clearPosts();
                    self.generatePostList();
                })

                post.onPostLiked(() => {
                    setAllPosts(posts);
                    self.clearPosts();
                    self.generatePostList();
                })

                self.add(post);
            });
            setAllPosts(posts);
        } catch (error) {
            alert(error.message);
        }

    }
}