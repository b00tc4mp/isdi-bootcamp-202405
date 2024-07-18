import Component from './Component.mjs'
import Author from './Author.mjs'
import Image from './Image.mjs'
import Field from './Field.mjs'
import Button from './Button.mjs'
import Separator from './Separator.mjs'
import Paragraph from './Paragraph.mjs'
import Form from './Form.mjs'
import Label from './Label.mjs'
import Input from './Input.mjs'
import Time from './Time.mjs'

import logic from '../logic/index.mjs'

import formatTime from '../util/formatTime.mjs'

class Post extends Component {
    constructor(post) {
        super(document.createElement('article'));
        this.setClassName('post');

        const self = this;

        const postAuthor = new Author(post);
        postAuthor.onAuthorClicked(() => {
            this.onPostAuthorClickedCallback(logic.getUserPosts(post.author));
        })
        this.add(postAuthor);

        const postImage = new Image();
        postImage.setImage(post.img);
        this.add(postImage);

        const postInteractionButtonsDiv = new Field('post__actions');
        this.add(postInteractionButtonsDiv);

        const likeButton = new Button();
        likeButton.setClassName('like-button');
        if (logic.hasLikedPost(post.id)) {
            likeButton.setHeartRed();
        } else {
            likeButton.setHeartWhite();
        }
        postInteractionButtonsDiv.add(likeButton);

        likeButton.onClick(() => {
            try {
                logic.togglePostLike(post.id);

                this.onPostInteractedCallback();
            } catch (error) {
                console.error(error);

                alert(error.message);

                if (error.message === 'post not found') {
                    this.onPostInteractedCallback();
                }
            }
        })

        const saveButton = new Button();
        saveButton.setClassName('save-button');
        saveButton.setColor(logic.hasPostSaved(post.id) ? 'black' : 'silver');
        postInteractionButtonsDiv.add(saveButton);

        saveButton.onClick(() => {
            try {
                logic.toggleSavedPost(post.id)

                this.onPostInteractedCallback();
            } catch (error) {
                console.error(error);

                alert(error.message);

                if (error.message === 'post not found') {
                    this.onPostInteractedCallback();
                }
            }

        })

        const separatorLikesNumber = new Separator();
        this.add(separatorLikesNumber);

        const numberOfLikes = new Paragraph('p');
        numberOfLikes.setClassName('like-counter');
        numberOfLikes.setText(`${post.likes.length} likes`);
        this.add(numberOfLikes);


        const postCaption = new Paragraph('p');
        postCaption.setClassName('post__caption');
        postCaption.setText(post.caption);
        this.add(postCaption);

        if (post.author === logic.getUserUsername()) {
            const postActionButtonsDiv = new Field('post__actions');
            self.add(postActionButtonsDiv);

            const deletePostButton = new Button();
            deletePostButton.setText('Delete');
            postActionButtonsDiv.add(deletePostButton);

            deletePostButton.onClick(() => {
                if (confirm('Delete Post?')) {
                    try {
                        logic.deletePosts(post.id);

                        this.onPostInteractedCallback();
                    } catch (error) {
                        console.error(error);

                        alert(error.message);

                        if (error.message === 'post not found') {
                            this.onPostInteractedCallback();
                        }
                    }
                }
            });

            const editCaptionPostButton = new Button();
            editCaptionPostButton.setText('Edit this post');
            postActionButtonsDiv.add(editCaptionPostButton);

            editCaptionPostButton.onClick(() => {
                const intervalID = logic.getIntervalID();
                clearInterval(intervalID);

                const createCaptionForm = new Form();
                this.add(createCaptionForm);

                const captionEditLabel = new Label('caption-edit-input');
                captionEditLabel.setText('New Caption');
                createCaptionForm.add(captionEditLabel);

                const captionEditInput = new Input(captionEditLabel.getFor());
                captionEditInput.setValue(post.caption);
                createCaptionForm.add(captionEditInput);

                const captionEditButton = new Button();
                captionEditButton.setType('submit');
                captionEditButton.setText('Change');
                createCaptionForm.add(captionEditButton);

                const editCaptionCancelButton = new Button();
                editCaptionCancelButton.setType('button');
                editCaptionCancelButton.setText('Cancel');
                createCaptionForm.add(editCaptionCancelButton);

                editCaptionCancelButton.onClick(() => {
                    this.remove(createCaptionForm);
                    this.onPostEditedCallback();
                });

                createCaptionForm.onSubmit((event) => {
                    event.preventDefault();

                    try {
                        logic.editPost(post.id, captionEditInput.getValue());

                        this.remove(createCaptionForm);

                        this.onPostEditedCallback();
                    } catch (error) {
                        console.error(error);

                        alert(error.message);

                        if (error.message === 'post not found') {
                            this.onPostEditedCallback();
                        }
                    }

                });
            });
        }

        const postDate = new Time('post__time');
        postDate.setText(formatTime(new Date(post.date)));
        this.add(postDate);
    };

    onPostInteracted(callback) {
        this.onPostInteractedCallback = callback;
    }

    onPostEdited(callback) {
        this.onPostEditedCallback = callback;
    }

    onPostAuthorClicked(callback) {
        this.onPostAuthorClickedCallback = callback;
    }
}

export default Post;