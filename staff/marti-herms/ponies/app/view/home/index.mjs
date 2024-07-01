import Component from '../../classes/Component.mjs'
import Header from '../../classes/Header.mjs'
import PostList from '../../classes/PostList.mjs'
import Footer from '../../classes/Footer.mjs'

import logic from '../../logic/index.mjs'
import data from '../../data/index.mjs'
import Profile from '../../classes/Profile.mjs'


const home = new Component(document.body);

const header = new Header();
home.add(header);

const profile = new Profile('profile-field');

header.onProfileClicked(() => {
    if (!body.has(profile)) {

        postListSection.clearPosts();
        body.remove(postListSection);

        const user = data.findUser(user => user.username === sessionStorage.username)

        body.add(profile);

        postListSection.generatePostList(logic.getUserPosts(user));
        body.add(postListSection);

        const intervalID = setInterval(function () {
            postListSection.clearPosts();
            postListSection.generatePostList(logic.getUserPosts(user));
        }, 2000);

        logic.setIntervalID(intervalID);
    }
})

const body = new Component(document.createElement('main'));
body.setClassName('view main');
home.add(body);

const postListSection = new PostList();
body.add(postListSection);

postListSection.generatePostList(logic.getAllPostIDs());

const intervalID = setInterval(function () {
    postListSection.clearPosts();
    postListSection.generatePostList(logic.getAllPostIDs());
}, 2000);

logic.setIntervalID(intervalID);

const footer = new Footer();
home.add(footer);

footer.onPostCreated(() => {
    if (body.has(profile)) {
        body.remove(profile);
    }

    postListSection.clearPosts();
    postListSection.generatePostList(logic.getAllPostIDs());
});

footer.onListFeed(() => {
    if (body.has(profile)) {
        body.remove(profile);
    }

    postListSection.clearPosts();
    postListSection.generatePostList(logic.getAllPostIDs());

    const intervalID = setInterval(function () {
        postListSection.clearPosts();
        postListSection.generatePostList(logic.getAllPostIDs());
    }, 2000);

    logic.setIntervalID(intervalID);
})

footer.onListSavedPost(() => {
    if (body.has(profile)) {
        body.remove(profile);
    }

    let intervalID = logic.getIntervalID();
    clearInterval(intervalID);

    postListSection.clearPosts();
    postListSection.generatePostList(logic.getUserSavedPosts());

    intervalID = setInterval(function () {
        postListSection.clearPosts();
        postListSection.generatePostList(logic.getUserSavedPosts());
    }, 2000);

    logic.setIntervalID(intervalID);
})

footer.onUserSearched((user) => {
    if (body.has(profile)) {
        body.remove(profile);
    }

    postListSection.clearPosts();
    postListSection.generatePostList(logic.getUserPosts(user));

    const intervalID = setInterval(function () {
        postListSection.clearPosts();
        postListSection.generatePostList(logic.getUserPosts(user));
    }, 2000);

    logic.setIntervalID(intervalID);
})

footer.onFollowedList(() => {
    if (body.has(profile)) {
        body.remove(profile);
    }

    postListSection.clearPosts();
    postListSection.generatePostList(logic.getFollowedUserPosts());

    const intervalID = setInterval(function () {
        postListSection.clearPosts();
        postListSection.generatePostList(logic.getFollowedUserPosts());
    }, 2000);

    logic.setIntervalID(intervalID);
})
