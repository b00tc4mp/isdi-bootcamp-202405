class Footer extends Component {
    constructor() {
        super(document.createElement('footer'));
        this.container.className = 'footer';

        const FeedListButton = new Button();
        FeedListButton.setClassName('feed-button');
        this.add(FeedListButton);

        FeedListButton.onClick(() => {
            const intervalID = logic.getIntervalID();
            clearInterval(intervalID);

            this.onListFeedCallback();
        })

        const addPostButton = new Button();
        addPostButton.setClassName('add-post-button');
        addPostButton.setText('+');
        this.add(addPostButton);

        addPostButton.onClick((event) => {
            event.stopPropagation();

            const home = new Component(document.body);

            const fader = new Fader();
            home.add(fader);

            fader.setDisplay('flex');

            const createPostSection = new Component(document.createElement('section'));
            createPostSection.setClassName('newposts');
            fader.add(createPostSection);

            const createPostTitle = new Paragraph('h2');
            createPostTitle.setText('Create Post');
            createPostSection.add(createPostTitle);

            const createPostForm = new Form('form');
            createPostSection.add(createPostForm);

            createPostForm.onSubmit((event) => {
                event.preventDefault();

                document.removeEventListener('click', handler, true);

                const postImage = postImageInput.getValue();
                const postCaption = postCaptionInput.getValue();

                try {
                    logic.addPost(postImage, postCaption);

                    fader.remove(createPostSection);
                    fader.setDisplay('none');

                    this.onPostCreatedCallback()

                } catch (error) {
                    alert(error.message);
                }
            });

            const postImageFieldDiv = new Field('form__field');
            createPostForm.add(postImageFieldDiv);

            const postImageLabel = new Label('post-image-input');
            postImageLabel.setText('Image');
            postImageFieldDiv.add(postImageLabel);

            const postImageInput = new Input(postImageLabel.getFor());
            postImageInput.setClassName('form__input');
            postImageFieldDiv.add(postImageInput);

            const postCaptionFieldDiv = new Field('form__field');
            createPostForm.add(postCaptionFieldDiv);

            const postCaptionLabel = new Label('post-caption-input');
            postCaptionLabel.setText('Caption');
            postCaptionFieldDiv.add(postCaptionLabel);

            const postCaptionInput = new Input(postCaptionLabel.getFor());
            postCaptionInput.setClassName('form__input');
            postCaptionFieldDiv.add(postCaptionInput);

            const postSubmitButton = new Button('form__button');
            postSubmitButton.setType('submit');
            postSubmitButton.setText('Create');
            createPostForm.add(postSubmitButton);

            const postCancelButton = new Button('form__button');
            postCancelButton.setType('reset');
            postCancelButton.setText('Cancel');
            createPostForm.add(postCancelButton);

            postCancelButton.onClick(() => {
                fader.remove(createPostSection);
                fader.setDisplay('none');
                document.removeEventListener('click', handler, true);
            });

            document.addEventListener('click', handler, true);

            function handler(e) {
                if (e.target === fader.container) {
                    fader.remove(createPostSection);
                    fader.setDisplay('none');
                    document.removeEventListener('click', handler, true);
                }
            }
        })

        const savedPostListButton = new Button();
        savedPostListButton.setClassName('save-button');
        this.add(savedPostListButton);

        savedPostListButton.onClick(() => {
            const intervalID = logic.getIntervalID();
            clearInterval(intervalID);

            this.onListSavedPostCallback();
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
}