import logic from '../../../logic/index.mjs';

import formatTime from '../../util/formatTime.mjs';

import LikeButton from './buttons/LikeButton.jsx';
import SaveButton from './buttons/SaveButton.jsx';

const { Component } = React;

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = { editMode: false, value: props.post.caption };
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleUserPosts() {
        const post = this.props.post;

        this.props.onUsernameClick(post.author);
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

    handleSaveClick() {
        this.props.onPostSaved();
    }

    handleEditButton() {
        this.setState({ editMode: true });
    }

    handleCaptionEdit(event) {
        event.preventDefault();

        const post = this.props.post;

        const form = event.target;

        const captionEditInput = form['caption-edit-input']

        try {

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

        const editCaptionForm = <form className="form__field edit" onSubmit={this.handleCaptionEdit.bind(this)}>
            <label htmlFor="caption-edit-input">Caption:</label>
            <input id="caption-edit-input" className="form__input" type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
            <button className="form__button" type="submit">Edit</button>
            <button className="form__button" type="button" onClick={this.handleEditCancel.bind(this)}>Cancel</button>
        </form>

        return <article className="post">
            <div className="post__author__div">
                <button className="post__author" onClick={this.handleUserPosts.bind(this)}>{post.author}</button>
                {post.author !== logic.getUserUsername() && <button className="post__author__button" onClick={this.handleFollowButton.bind(this)}>{logic.isUserFollowing(post.author) ? 'Unfollow' : 'Follow'}</button>}
            </div>
            <img src={post.img} className="post__image" />
            <div className="post__actions">
                <LikeButton post={post} onLikeClicked={this.handleLikeClick.bind(this)} />
                <SaveButton postId={post.id} onSaveClicked={this.handleSaveClick.bind(this)} />
            </div>
            <hr></hr>
            <p className="like-counter">{post.likes.length + ' like' + (post.likes.length !== 1 ? 's' : '')}</p>
            <p className="post__caption">{post.caption}</p>
            {
                post.author === logic.getUserUsername() && <><div className='post__options'>
                    <button className="form__button" onClick={this.handleDeleteButton.bind(this)}>Delete</button>
                    <button className="form__button" onClick={this.handleEditButton.bind(this)}>Edit</button>
                    <div className="edit">
                        {this.state.editMode && editCaptionForm}
                    </div>
                </div></>
            }
            <time className="post__time">{formatTime(new Date(post.date))}</time>
        </article >
    }
}

export default Post