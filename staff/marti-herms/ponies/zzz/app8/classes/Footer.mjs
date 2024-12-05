import Component from './Component.mjs'

import HomeButton from './buttons/HomeButton.mjs'
import AddPostButton from './buttons/AddPostButton.mjs'
import SavedPostsButton from './buttons/SavedPostsButton.mjs'
import SearchButton from './buttons/SearchButton.mjs'
import FollowedPostsButton from './buttons/FollowedPostsButton.mjs'

class Footer extends Component {
    constructor() {
        super(document.createElement('footer'));
        this.container.className = 'footer';

        const home = new Component(document.body);

        //Home Button definition
        const feedListButton = new HomeButton();
        feedListButton.setClassName('feed-button');
        feedListButton.setColor('gray');
        this.add(feedListButton);

        feedListButton.onClick(this, () => {
            userSearchButton.setColor('white');
            feedListButton.setColor('gray');
            savedPostListButton.setColor('white');
            followedUsersPostListButton.setColor('white');
        });

        //Search Button definition
        const userSearchButton = new SearchButton();
        userSearchButton.setClassName('search-button');
        userSearchButton.setColor('white');
        this.add(userSearchButton);

        userSearchButton.onClick(this, () => {
            userSearchButton.setColor('gray');
            feedListButton.setColor('white');
            savedPostListButton.setColor('white');
            followedUsersPostListButton.setColor('white');
        });

        // Post Button definition
        const addPostButton = new AddPostButton();
        addPostButton.setClassName('add-post-button');
        addPostButton.setText('+');
        this.add(addPostButton);

        addPostButton.onClick(this);

        // Followed Users Post Button definition
        const followedUsersPostListButton = new FollowedPostsButton();
        followedUsersPostListButton.setClassName('followed-button');
        followedUsersPostListButton.setColor('white');
        this.add(followedUsersPostListButton);

        followedUsersPostListButton.onClick(this, () => {
            userSearchButton.setColor('white');
            feedListButton.setColor('white');
            savedPostListButton.setColor('white');
            followedUsersPostListButton.setColor('gray');
        })

        // Saved Posts Button definition
        const savedPostListButton = new SavedPostsButton();
        savedPostListButton.setClassName('save-button');
        savedPostListButton.setColor('white');
        this.add(savedPostListButton);

        savedPostListButton.onClick(this, () => {
            userSearchButton.setColor('white');
            feedListButton.setColor('white');
            savedPostListButton.setColor('gray');
            followedUsersPostListButton.setColor('white');
        })
    }

    onPostCreated(callback) {
        this.onPostCreatedCallback = callback;
    }

    onListFeed(callback) {
        this.onListFeedCallback = callback;
    }

    onListSavedPost(callback) {
        this.onListSavedPostCallback = callback;
    }

    onUserSearched(callback) {
        this.onUserSearchedCallback = callback;
    }

    onFollowedList(callback) {
        this.onFollowedListCallback = callback;
    }
}

export default Footer;