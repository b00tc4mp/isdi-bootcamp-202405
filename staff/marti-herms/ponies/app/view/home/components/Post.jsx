import logic from '../../../logic/index.mjs';

import formatTime from '../../util/formatTime.mjs';

import LikeButton from './buttons/LikeButton.jsx';
import SaveButton from './buttons/SaveButton.jsx';

const { Component } = React;

class Post extends Component {
    constructor() {
        super();
    }

    handleUserPosts() {

    }

    handleFollowButton = () => {
        try {
            const post = this.props.post;

            logic.toggleUserFollow(post.author)
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleDeleteButton() {
        if (confirm('Delete Post?')) {
            try {
                const post = this.props.post;

                logic.deletePosts(post.id);
            } catch (error) {
                console.error(error);

                alert(error.message);
            }
        }
    }

    handleEditButton() {

    }

    render() {
        const post = this.props.post;

        return <article className="post">
            <div className='post__author__div'>
                <button className="post__author" onClick={this.handleUserPosts}>{post.author}</button>
                {post.author !== logic.getUserUsername() && <button className='post__author__button' onClick={this.handleFollowButton}>{logic.isUserFollowing(post.author) ? 'Unfollow' : 'Follow'}</button>}
            </div>
            <img src={post.img} className="post__image" />
            <div className="post__actions">
                <LikeButton postId={post.id} />
                <SaveButton postId={post.id} />
            </div>
            <hr></hr>
            <p className="like-counter">{post.likes.length + ' like' + (post.likes.length > 1 ? 's' : '')}</p>
            <p className="post__caption">{post.caption}</p>
            {
                post.author === logic.getUserUsername() && <><div className='post__actions'>
                    <button onClick={this.handleDeleteButton}>Delete</button>
                    <button onClick={this.handleEditButton}>Edit</button>
                </div></>
            }
            <time className="post__time">{formatTime(new Date(post.date))}</time>
        </article >
    }
}

export default Post