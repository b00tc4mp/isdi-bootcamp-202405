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

    generatePostList = (list) => {
        try {
            const posts = logic.getAllPosts();

            const self = this;

            posts.forEach((_post) => {
                for (let i = 0; i < list.length; i++) {
                    if (_post.id === list[i]) {
                        const post = new Post(_post);

                        post.onPostInteracted(() => {
                            logic.setAllPosts(posts);
                            self.clearPosts();
                            self.generatePostList(list);
                        })

                        post.onPostEdited(() => {
                            self.clearPosts();
                            self.generatePostList(list);

                            const intervalID = setInterval(function () {
                                self.clearPosts();
                                self.generatePostList(list);
                            }, 2000);

                            logic.setIntervalID(intervalID);
                        })

                        self.add(post);
                    }
                }
            });
            logic.setAllPosts(posts);
        } catch (error) {
            alert(error.message);
        }

    }
}