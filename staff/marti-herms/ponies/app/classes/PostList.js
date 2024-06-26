class PostList extends Component {
    constructor() {
        super(document.createElement('section'));
        this.setClassName('post-list');
    }

    clearPosts = () => {
        for (let i = this.getChildren().length - 1; i > -1; i--) {
            const child = this.getChildren()[i];

            this.container.removeChild(child);
        }
    }

    generateFeedPostList = () => {
        try {
            const posts = logic.getAllPosts();

            const self = this;

            posts.forEach((_post) => {
                const post = new Post(_post);

                post.onPostInteracted(() => {
                    logic.setAllPosts(posts);
                    self.clearPosts();
                    self.generateFeedPostList();
                })

                post.onPostEdited(() => {
                    self.clearPosts();
                    self.generateFeedPostList();

                    const intervalID = setInterval(function () {
                        self.clearPosts();
                        self.generateFeedPostList();
                    }, 2000);

                    logic.setIntervalID(intervalID);
                })

                self.add(post);
            });
            logic.setAllPosts(posts);
        } catch (error) {
            alert(error.message);
        }

    }

    generateSavedPostList = () => {
        try {
            const posts = logic.getAllSavedPosts();

            const self = this;

            posts.forEach((_post) => {
                const post = new Post(_post);

                post.onPostInteracted(() => {
                    logic.setAllSavedPosts(posts);
                    self.clearPosts();
                    self.generateSavedPostList();
                })

                post.onPostEdited(() => {
                    self.clearPosts();
                    self.generateSavedPostList();

                    const intervalID = setInterval(function () {
                        self.clearPosts();
                        self.generateSavedPostList();
                    }, 2000);

                    logic.setIntervalID(intervalID);
                })

                self.add(post);
            });
            logic.setAllSavedPosts(posts);
        } catch (error) {
            alert(error.message);
        }

    }
}