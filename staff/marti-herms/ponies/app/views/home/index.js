(() => {
    // <-><-><-><-><->Create Header elements<-><-><-><-><->
    const body = new Component(document.body);

    const header = new Header();
    body.add(header);

    const fader = new Fader();
    body.add(fader);

    const userName = new Text('p');
    header.add(userName);

    try {
        const name = getUserName();

        userName.setInnerText('Hello, ' + name + '!');
    } catch (error) {
        alert(error.message);
    }

    const logoutButton = new Button('logout-button');
    logoutButton.setInnerText('Logout');
    header.add(logoutButton);

    logoutButton.container.onclick = () => {
        try {
            logoutUser();

            location.href = '../login';
        } catch (error) {
            alert(error.message);
        }
    };
    // ^^^^^^^^^^^^^^^Create Header elements^^^^^^^^^^^^^^^

    // <-><-><-><-><->Create Main elements<-><-><-><-><->
    const main = new Main('view main');
    body.add(main);

    const postListSection = new Section('post-list');
    main.add(postListSection);

    // <-><-><-><-><->Function to clear posts<-><-><-><-><->
    const clearPosts = () => {
        for (let i = postListSection.getChildren().length - 1; i > -1; i--) {
            const child = postListSection.getChildren()[i];

            postListSection.container.removeChild(child);
        }
    }
    // ^^^^^^^^^^^^^^^Function to clear posts^^^^^^^^^^^^^^^
    // <-><-><-><-><->Function to list posts<-><-><-><-><->
    const generatePostList = () => {
        try {
            const posts = getAllPosts();

            posts.forEach(post => {
                const postArticle = new Article();
                postListSection.add(postArticle);

                const postAuthor = new Author();
                postAuthor.setInnerText(post.author);
                postArticle.add(postAuthor);

                const postImage = new Image();
                postImage.setImage(post.img);
                postArticle.add(postImage);

                const postCaption = new Text('p');
                postCaption.setClassName('post__caption');
                postCaption.setInnerText(post.caption);
                postArticle.add(postCaption);

                if (post.author === getUserUsername()) {
                    const postActionButtonsDiv = new Divider('post__actions');
                    postArticle.add(postActionButtonsDiv);

                    const deletePostButton = new Button();
                    deletePostButton.setInnerText('Delete');
                    postActionButtonsDiv.add(deletePostButton);

                    deletePostButton.container.onclick = (event) => {
                        if (confirm('Delete Post?')) {
                            try {
                                deletePosts(post.id);

                                clearPosts();
                                generatePostList();
                            } catch (error) {
                                alert(error.message);

                                if (error.message === 'post not found') {
                                    clearPosts();
                                    generatePostList();
                                }
                            }
                        }
                    }

                    const editCaptionPostButton = new Button();
                    editCaptionPostButton.setInnerText('Edit this post');
                    postActionButtonsDiv.add(editCaptionPostButton);

                    editCaptionPostButton.container.onclick = () => {
                        const createCaptionForm = new Form();
                        postArticle.add(createCaptionForm);

                        const captionEditLabel = new Label('caption-edit-input');
                        captionEditLabel.setInnerText('New Caption');
                        createCaptionForm.add(captionEditLabel)

                        const captionEditInput = new Input(captionEditLabel.getFor());
                        captionEditInput.value = post.caption;
                        createCaptionForm.add(captionEditInput);

                        const captionEditButton = new Button();
                        captionEditButton.setType('submit');
                        captionEditButton.setInnerText('Change');
                        createCaptionForm.add(captionEditButton);

                        const editCaptionCancelButton = new Button();
                        editCaptionCancelButton.setType('button');
                        editCaptionCancelButton.setInnerText('Cancel');
                        createCaptionForm.add(editCaptionCancelButton);

                        editCaptionCancelButton.container.onclick = () => {
                            postArticle.remove(createCaptionForm);
                        }

                        createCaptionForm.container.onsubmit = (event) => {
                            event.preventDefault();

                            try {
                                editPost(post.id, captionEditInput.value);

                                postArticle.remove(createCaptionForm);

                                clearPosts();
                                generatePostList();
                            } catch (error) {
                                alert(error.message);

                                if (error.message === 'post not found') {
                                    clearPosts();
                                    generatePostList();
                                }
                            }

                        }
                    }
                }

                const postDate = new Time('post__time');
                postDate.setInnerText(formatTime(new Date(post.date)));
                postArticle.add(postDate);
            });
        } catch (error) {
            alert(error.message);
        }

    }
    // ^^^^^^^^^^^^^^^Function to list posts^^^^^^^^^^^^^^^

    generatePostList();

    const footer = new Footer();
    body.add(footer);

    const addPostButton = new Button('add-post-button');
    addPostButton.setInnerText('+');
    footer.add(addPostButton);

    // <-><-><-><-><->Function to add posts<-><-><-><-><->
    addPostButton.container.onclick = (event) => {
        event.stopPropagation();

        fader.setDisplay('flex');

        const createPostSection = new Section('newposts');
        fader.add(createPostSection);

        const createPostTitle = new Text('h2');
        createPostTitle.setInnerText('Create Post');
        createPostSection.add(createPostTitle);

        const createPostForm = new Form('form');
        createPostSection.add(createPostForm);

        createPostForm.container.onsubmit = (event) => {
            event.preventDefault();

            document.removeEventListener('click', handler, true);

            const postImage = postImageInput.container.value;
            const postCaption = postCaptionInput.container.value;

            try {
                addPost(postImage, postCaption);

                fader.remove(createPostSection);
                fader.setDisplay('none');

                clearPosts();
                generatePostList();
            } catch (error) {
                alert(error.message);
            }
        }

        const postImageFieldDiv = new Divider('form__field');
        createPostForm.add(postImageFieldDiv);

        const postImageLabel = new Label('post-image-input');
        postImageLabel.setInnerText('Image');
        postImageFieldDiv.add(postImageLabel);

        const postImageInput = new Input(postImageLabel.getFor());
        postImageInput.setClassName('form__input');
        postImageFieldDiv.add(postImageInput);

        const postCaptionFieldDiv = new Divider('form__field');
        createPostForm.add(postCaptionFieldDiv);

        const postCaptionLabel = new Label('post-caption-input');
        postCaptionLabel.setInnerText('Caption');
        postCaptionFieldDiv.add(postCaptionLabel);

        const postCaptionInput = new Input(postCaptionLabel.getFor());
        postCaptionInput.setClassName('form__input');
        postCaptionFieldDiv.add(postCaptionInput);

        const postSubmitButton = new Button('form__button');
        postSubmitButton.setType('submit');
        postSubmitButton.setInnerText('Create');
        createPostForm.add(postSubmitButton);

        const postCancelButton = new Button('form__button');
        postCancelButton.setType('reset');
        postCancelButton.setInnerText('Cancel');
        createPostForm.add(postCancelButton);

        postCancelButton.container.onclick = () => {
            fader.remove(createPostSection);
            fader.setDisplay('none');
            document.removeEventListener('click', handler, true);
        }

        document.addEventListener('click', handler, true);

        function handler(e) {
            if (e.target === fader.container) {
                fader.remove(createPostSection);
                fader.setDisplay('none');
                document.removeEventListener('click', handler, true);
            }
        }
    }
    // ^^^^^^^^^^^^^^^Function to add posts^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^Create Main elements^^^^^^^^^^^^^^^
})();