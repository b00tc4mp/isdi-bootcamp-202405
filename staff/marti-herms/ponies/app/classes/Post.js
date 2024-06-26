class Post extends Component {
    constructor(post) {
        super(document.createElement('article'));
        this.setClassName('post');

        const self = this;

        const postAuthor = new Author();
        postAuthor.setText(post.author);
        this.add(postAuthor);

        const postImage = new Image();
        postImage.setImage(post.img);
        this.add(postImage);

        const postInteractionButtonsDiv = new Field('post__actions');
        this.add(postInteractionButtonsDiv);

        const likeButton = new LikeButton();
        likeButton.setClassName('like-button');
        if (hasLikedPost(post.id)) {
            likeButton.setColorRed();
        } else if (!hasLikedPost(post.id)) {
            likeButton.setColorGray();
        }
        postInteractionButtonsDiv.add(likeButton);

        likeButton.onClick((event) => {
            event.stopPropagation()
            if (hasLikedPost(post.id)) {
                likeButton.setColorGray();

                post.likes--;

                removePostLike(post.id);

                this.onPostLikedCallback();

            } else if (!hasLikedPost(post.id)) {
                likeButton.setColorRed();

                post.likes++;

                addPostLike(post.id)

                this.onPostLikedCallback();

            }
        })

        const numberOfLikes = new Paragraph('p');
        numberOfLikes.setClassName('like-counter');
        numberOfLikes.setText(`${post.likes} likes`);
        this.add(numberOfLikes);

        const separator = new Component(document.createElement('hr'));
        this.add(separator);

        const postCaption = new Paragraph('p');
        postCaption.setClassName('post__caption');
        postCaption.setText(post.caption);
        this.add(postCaption);

        if (post.author === getUserUsername()) {
            const postActionButtonsDiv = new Field('post__actions');
            self.add(postActionButtonsDiv);

            const deletePostButton = new Button();
            deletePostButton.setText('Delete');
            postActionButtonsDiv.add(deletePostButton);

            deletePostButton.onClick(() => {
                if (confirm('Delete Post?')) {
                    try {
                        deletePosts(post.id);

                        this.onPostDeletedCallback();
                    } catch (error) {
                        alert(error.message);

                        if (error.message === 'post not found') {
                            this.onPostDeletedCallback();
                        }
                    }
                }
            });

            const editCaptionPostButton = new Button();
            editCaptionPostButton.setText('Edit this post');
            postActionButtonsDiv.add(editCaptionPostButton);

            editCaptionPostButton.onClick(() => {
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
                });

                createCaptionForm.onSubmit((event) => {
                    event.preventDefault();

                    try {
                        editPost(post.id, captionEditInput.getValue());

                        this.remove(createCaptionForm);

                        this.onPostDeletedCallback();
                    } catch (error) {
                        alert(error.message);

                        if (error.message === 'post not found') {
                            this.onPostDeletedCallback();
                        }
                    }

                });
            });
        }

        const postDate = new Time('post__time');
        postDate.setText(formatTime(new Date(post.date)));
        this.add(postDate);
    };

    onPostDeleted(callback) {
        this.onPostDeletedCallback = callback;
    }

    onPostLiked(callback) {
        this.onPostLikedCallback = callback;
    }
}