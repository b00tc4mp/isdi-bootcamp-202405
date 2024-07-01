import Component from './Component.mjs'
import Post from './Post.mjs'
import logic from '../logic/index.mjs'


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
                    if (_post.id == list[i]) {
                        const post = new Post(_post);

                        post.onPostInteracted((newList) => {
                            if (newList === undefined) {
                                newList = list;
                            }

                            self.clearPosts();
                            self.generatePostList(newList);
                        })

                        post.onPostAuthorClicked((newList) => {
                            if (newList === undefined) {
                                newList = list;
                            }

                            let intervalID = logic.getIntervalID();
                            clearInterval(intervalID);

                            self.clearPosts();
                            self.generatePostList(newList);

                            intervalID = setInterval(function () {
                                postListSection.clearPosts();
                                postListSection.generatePostList(newList);
                            }, 2000);

                            logic.setIntervalID(intervalID);
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
            console.error(error);

            alert(error.message);
        }

    }
}

export default PostList;