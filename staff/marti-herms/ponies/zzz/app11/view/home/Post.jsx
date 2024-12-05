import logic from '../../logic/index.mjs';

import formatTime from '../../util/formatTime.mjs';

import LikeButton from './LikeButton.jsx';
import SaveButton from './SaveButton.jsx';
import Avatar from './Avatar.jsx';

import Heading from '../components/Heading.jsx';
import Form from '../components/Form.jsx';
import Label from '../components/Label.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import Container from '../components/Container.jsx';
import Image from '../components/Image.jsx';
import Paragraph from '../components/Paragraph.jsx';
import Time from '../components/Time.jsx';

const { Component } = React;

class Post extends Component {
    constructor() {
        super();

        this.state = { editMode: false };
    }

    handleUserProfile() {
        const { post } = this.props;

        this.props.onUserClick(post.author);
    }

    handleFollowButton() {
        try {
            const { post } = this.props;

            logic.toggleUserFollow(post.author)

            this.props.onFollow();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    handleDeleteButton() {
        if (confirm('Delete Post?')) {
            try {
                const { post } = this.props;

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

        const { post } = this.props;

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
        const { post } = this.props;

        const editCaptionForm = <Form className="edit" onSubmit={this.handleCaptionEdit.bind(this)}>
            <Label htmlFor="caption-edit-input">Caption:</Label>
            <Input id="caption-edit-input" name="edit" defaultValue={this.state.value} />
            <Button type="submit">Edit</Button>
            <Button type="button" onClick={this.handleEditCancel.bind(this)}>Cancel</Button>
        </Form>

        return <article className="Post">
            <Container className="Container--top">
                <Button className="Button--author" onClick={this.handleUserProfile.bind(this)}>
                    <Avatar url={logic.getUserAvatar(post.author)} />
                    <Heading level="4">{post.author}</Heading>
                </Button>
                {post.author !== logic.getUserUsername() && <Button onClick={this.handleFollowButton.bind(this)}>{logic.isUserFollowing(post.author) ? 'Unfollow' : 'Follow'}</Button>}
            </Container>
            <Image src={post.img} alt={post.caption} title={post.caption} />
            <Container className="Container--actions">
                <LikeButton post={post} onLikeClicked={this.handleLikeClick.bind(this)} />
                <SaveButton postId={post.id} onSaveClicked={this.handleSaveClick.bind(this)} />
            </Container>
            <hr />
            <Paragraph className="Paragraph--likes">{post.likes.length + ' like' + (post.likes.length !== 1 ? 's' : '')}</Paragraph>
            <Paragraph>{post.caption}</Paragraph>
            {
                post.author === logic.getUserUsername() && <Container className='Container--options'>
                    <Button onClick={this.handleDeleteButton.bind(this)}>Delete</Button>
                    <Button onClick={this.handleEditButton.bind(this)}>Edit</Button>
                    <Container className="Container--edit">
                        {this.state.editMode && editCaptionForm}
                    </Container>
                </Container>
            }
            <Time>{formatTime(new Date(post.date))}</Time>
        </article >
    }
}

export default Post