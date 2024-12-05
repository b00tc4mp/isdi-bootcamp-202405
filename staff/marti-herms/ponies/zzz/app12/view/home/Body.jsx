import logic from '../../logic/index.mjs';

import Post from './Post';
import Profile from './Profile';

import { Component } from 'react';

class Body extends Component {
    constructor() {
        super();

        try {
            const posts = logic.getAllPosts();

            this.state = { posts, profile: null };
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    componentWillReceiveProps(newProps) {
        const newFeed = newProps.feed;

        const oldFeed = this.props.feed;

        if (newProps.refreshStamp !== this.props.refreshStamp || (/*newFeed !== oldFeed &&*/ newFeed === 'home')) {
            try {
                const posts = logic.getAllPosts();

                this.setState({ posts, profile: null });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
        } else if (newFeed !== oldFeed && newFeed === 'saved') {
            try {
                const posts = logic.getUserSavedPosts();

                this.setState({ posts, profile: null });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
        } else if (newFeed !== oldFeed && newFeed === 'followed') {
            try {
                const posts = logic.getFollowedUserPosts();

                this.setState({ posts, profile: null });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
        } else if (newFeed !== oldFeed && logic.getUserList().includes(newFeed)) {
            try {
                const posts = logic.getUserPosts(newFeed);

                this.setState({ posts, profile: newFeed });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
        }
    }

    handleUserProfile(username) {
        try {
            const posts = logic.getUserPosts(username);

            this.setState({ posts, profile: username });
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    handleDeletedPost() {
        try {
            const posts = logic.getAllPosts();

            this.setState({ posts });
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    handlePostLiked() {
        try {
            const posts = logic.getAllPosts();

            this.setState({ posts });
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    handlePostSaved() {
        if (this.props.feed === 'saved') {
            try {
                const posts = logic.getUserSavedPosts();

                this.setState({ posts });
            } catch (error) {
                console.error(error)

                alert(error.message);
            }
        }
    }

    handlePostEdited() {
        try {
            const posts = logic.getAllPosts();

            this.setState({ posts });
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    handleUserFollowed() {
        try {
            let posts = [];
            if (logic.getUserList().includes(this.state.profile)) {
                posts = logic.getUserPosts(this.state.profile);
            } else {
                posts = logic.getAllPosts();
            }

            this.setState({ posts });
        } catch (error) {
            console.error(error)

            alert(error.message);
        }
    }

    render() {
        const { profile } = this.state;
        return <main className="View--home">
            {profile && <Profile username={profile} onChange={this.handleUserProfile.bind(this)} />}
            <section className="Post-list">
                {this.state.posts.map(post => <Post key={post.id} post={post}
                    onUserClick={this.handleUserProfile.bind(this)}
                    onPostDeleted={this.handleDeletedPost.bind(this)}
                    onPostEdited={this.handlePostEdited.bind(this)}
                    onPostLiked={this.handlePostLiked.bind(this)}
                    onPostSaved={this.handlePostSaved.bind(this)}
                    onFollow={this.handleUserFollowed.bind(this)} />)}
            </section>
        </main>
    }
}

export default Body