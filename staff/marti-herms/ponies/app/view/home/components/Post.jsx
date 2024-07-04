import logic from '../../../logic/index.mjs';

import formatTime from '../../util/formatTime.mjs';

import LikeButton from './buttons/LikeButton.jsx';
import SaveButton from './buttons/SaveButton.jsx';

const { Component } = React;

class Post extends Component {
    constructor() {
        super();

        this.state = { editMode: false };
    }

    handleUserPosts() {

    }

    handleFollowButton() {
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

                this.props.onPostDeleted();
            } catch (error) {
                console.error(error);

                alert(error.message);
            }
        }
    }


    handleLikeClick() {
        this.props.onPostLiked();
    }

    handleEditButton() {
        this.setState({ editMode: true });
    }

    handleCaptionEdit(event) {
        event.preventDefault();

        try {
            const post = this.props.post;

            const form = event.target;

            const captionEditInput = form['caption-edit-input']

            logic.editPost(post.id, captionEditInput.value);

            this.setState({ editMode: false });

            this.props.onPostEdited();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleEditCancel() {
        this.setState({ editMode: false });
    }

    render() {
        const post = this.props.post;

        const editCaptionForm = <form onSubmit={this.handleCaptionEdit.bind(this)}>
            <label htmlFor="caption-edit-input"></label>
            <input id="caption-edit-input" type="text" value={post.caption} />
            <button type='submit'>Edit</button>
            <button type='button' onClick={this.handleEditCancel.bind(this)}>Cancel</button>
        </form>

        return <article className="post">
            <div className='post__author__div'>
                <button className="post__author" onClick={this.handleUserPosts}>{post.author}</button>
                {post.author !== logic.getUserUsername() && <button className='post__author__button' onClick={this.handleFollowButton.bind(this)}>{logic.isUserFollowing(post.author) ? 'Unfollow' : 'Follow'}</button>}
            </div>
            <img src={post.img} className="post__image" />
            <div className="post__actions">
                <LikeButton post={post} onLikeClicked={this.handleLikeClick.bind(this)} />
                <SaveButton postId={post.id} />
            </div>
            <hr></hr>
            <p className="like-counter">{post.likes.length + ' like' + (post.likes.length > 1 ? 's' : '')}</p>
            <p className="post__caption">{post.caption}</p>
            {
                post.author === logic.getUserUsername() && <><div className='post__actions'>
                    <button onClick={this.handleDeleteButton.bind(this)}>Delete</button>
                    <button onClick={this.handleEditButton.bind(this)}>Edit</button>
                    {this.state.editMode && editCaptionForm}
                </div></>
            }
            <time className="post__time">{formatTime(new Date(post.date))}</time>
        </article >
    }
}

export default Post