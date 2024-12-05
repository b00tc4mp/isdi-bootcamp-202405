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

                        self.onPostDeletedCallback();
                    } catch (error) {
                        alert(error.message);

                        if (error.message === 'post not found') {
                            self.onPostDeletedCallback();
                        }
                    }
                }
            });

            const editCaptionPostButton = new Button();
            editCaptionPostButton.setText('Edit this post');
            postActionButtonsDiv.add(editCaptionPostButton);

            editCaptionPostButton.onClick(() => {
                const createCaptionForm = new Form();
                self.add(createCaptionForm);

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
                    self.remove(createCaptionForm);
                });

                createCaptionForm.onSubmit((event) => {
                    event.preventDefault();

                    try {
                        editPost(post.id, captionEditInput.getValue());

                        self.remove(createCaptionForm);

                        self.onPostDeletedCallback();
                    } catch (error) {
                        alert(error.message);

                        if (error.message === 'post not found') {
                            self.onPostDeletedCallback();
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
}