import Component from './Component.mjs'
import Paragraph from './Paragraph.mjs';
import Button from './Button.mjs'
import logic from '../logic/index.mjs';

class Author extends Component {
    constructor(post) {
        super(document.createElement('div'));
        this.setClassName('post__author__div');

        const authorName = new Button();
        authorName.setClassName('post__author')
        authorName.setText(post.author);
        this.add(authorName);

        authorName.onClick(() => {
            this.onAuthorClickedCallback();
        })

        if (post.author !== logic.getUserUsername()) {
            const followButton = new Button();
            followButton.setClassName('post__author__button');
            if (logic.isUserFollowing(post.author)) {
                followButton.setText('Unfollow');
            } else {
                followButton.setText('Follow');
            }
            this.add(followButton);

            followButton.onClick(() => {
                try {
                    if (logic.isUserFollowing(post.author)) {
                        followButton.setText('Follow');
                    } else {
                        followButton.setText('Unfollow');
                    }
                    logic.toggleUserFollow(post.author)
                } catch (error) {
                    console.error(error);

                    alert(error.message);
                }
            })

        }

    }

    onAuthorClicked(callback) {
        this.onAuthorClickedCallback = callback;
    }
}

export default Author;