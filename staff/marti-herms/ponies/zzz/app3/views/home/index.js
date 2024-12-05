(function () {

    // <-><-><-><-><->Create Header elements<-><-><-><-><->
    var header = document.createElement('header');
    header.className = 'header';
    document.body.appendChild(header);

    var fader = document.createElement('div');
    fader.className = 'fader';
    document.body.appendChild(fader);

    var userName = document.createElement('p');
    header.appendChild(userName);

    try {
        var name = getUserName();

        userName.innerText = 'Hello, ' + name + '!';
    } catch (error) {
        alert(error.message);
    }

    var logoutButton = document.createElement('button');
    logoutButton.className = 'logout-button';
    logoutButton.innerText = 'Logout';
    header.appendChild(logoutButton);

    logoutButton.onclick = function () {
        try {
            logoutUser();

            location.href = '../login';
        } catch (error) {
            alert(error.message);
        }
    }
    // ^^^^^^^^^^^^^^^Create Header elements^^^^^^^^^^^^^^^

    // <-><-><-><-><->Create Main elements<-><-><-><-><->
    var main = document.createElement('main');
    main.className = 'view main';
    document.body.appendChild(main);

    var postListSection = document.createElement('section');
    postListSection.className = 'post-list'
    main.appendChild(postListSection);

    // <-><-><-><-><->Function to clear posts<-><-><-><-><->
    function clearPosts() {
        for (var i = postListSection.children.length - 1; i > -1; i--) {
            var child = postListSection.children[i]

            postListSection.removeChild(child)
        }
    }
    // ^^^^^^^^^^^^^^^Function to clear posts^^^^^^^^^^^^^^^
    // <-><-><-><-><->Function to list posts<-><-><-><-><->
    function generatePostList() {
        try {
            var posts = getAllPosts();

            posts.forEach(function (post) {
                var postArticle = document.createElement('article');
                postArticle.className = 'post';
                postListSection.appendChild(postArticle);

                var postAuthor = document.createElement('h3');
                postAuthor.className = 'post__author';
                postAuthor.innerText = post.author;
                postArticle.appendChild(postAuthor);

                var postImage = document.createElement('img');
                postImage.className = 'post__image';
                postImage.src = post.img;
                postArticle.appendChild(postImage);

                var postCaption = document.createElement('p');
                postCaption.className = 'post__caption'
                postCaption.innerText = post.caption;
                postArticle.appendChild(postCaption);

                if (post.author === getUserUsername()) {
                    var postActionButtonsDiv = document.createElement('div')
                    postActionButtonsDiv.className = 'post__actions'
                    postArticle.appendChild(postActionButtonsDiv)

                    var deletePostButton = document.createElement('button');
                    deletePostButton.innerText = 'Delete'
                    postActionButtonsDiv.appendChild(deletePostButton);

                    deletePostButton.onclick = function (event) {
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

                    var editCaptionPostButton = document.createElement('button');
                    editCaptionPostButton.innerText = 'Edit this post'
                    postActionButtonsDiv.appendChild(editCaptionPostButton);

                    editCaptionPostButton.onclick = function () {
                        var createCaptionForm = document.createElement('form');
                        postArticle.appendChild(createCaptionForm);

                        var captionEditLabel = document.createElement('label');
                        captionEditLabel.htmlFor = 'caption-edit-input';
                        captionEditLabel.innerText = 'New Caption';
                        createCaptionForm.appendChild(captionEditLabel)

                        var captionEditInput = document.createElement('input');
                        captionEditInput.id = captionEditLabel.htmlFor;
                        captionEditInput.value = post.caption;
                        createCaptionForm.appendChild(captionEditInput);

                        var captionEditButton = document.createElement('button');
                        captionEditButton.type = 'submit'
                        captionEditButton.innerText = 'Change';
                        createCaptionForm.appendChild(captionEditButton);

                        var editCaptionCancelButton = document.createElement('button');
                        editCaptionCancelButton.innerText = 'Cancel';
                        editCaptionCancelButton.type = 'button';
                        createCaptionForm.appendChild(editCaptionCancelButton);

                        editCaptionCancelButton.onclick = function () {
                            postArticle.removeChild(createCaptionForm);
                        }

                        createCaptionForm.onsubmit = function (event) {
                            event.preventDefault();

                            try {
                                editPost(post.id, captionEditInput.value);

                                postArticle.removeChild(createCaptionForm);

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

                var postDate = document.createElement('time');
                postDate.className = 'post__time'
                postDate.innerText = formatTime(new Date(post.date));
                postArticle.appendChild(postDate);
            });
        } catch (error) {
            alert(error.message);
        }

    }
    // ^^^^^^^^^^^^^^^Function to list posts^^^^^^^^^^^^^^^

    generatePostList();

    var footer = document.createElement('footer');
    footer.className = 'footer';
    document.body.appendChild(footer);

    var addPostButton = document.createElement('button');
    addPostButton.className = 'add-post-button';
    addPostButton.innerText = '+';
    footer.appendChild(addPostButton);

    // <-><-><-><-><->Function to add posts<-><-><-><-><->
    addPostButton.onclick = function (event) {
        event.stopPropagation();

        fader.style.display = 'flex';

        var createPostSection = document.createElement('section');
        createPostSection.className = 'newposts';
        fader.appendChild(createPostSection);

        var createPostTitle = document.createElement('h2');
        createPostTitle.innerText = 'Create Post';
        createPostSection.appendChild(createPostTitle);

        var createPostForm = document.createElement('form');
        createPostForm.className = 'form';
        createPostSection.appendChild(createPostForm);

        createPostForm.onsubmit = function (event) {
            event.preventDefault();

            document.removeEventListener('click', handler, true);

            var postImage = postImageInput.value;
            var postCaption = postCaptionInput.value;

            try {
                addPost(postImage, postCaption);

                fader.removeChild(createPostSection);
                fader.style.display = 'none';

                clearPosts();
                generatePostList();
            } catch (error) {
                alert(error.message);
            }
        }

        var postImageFieldDiv = document.createElement('div');
        postImageFieldDiv.className = 'form__field';
        createPostForm.appendChild(postImageFieldDiv);

        var postImageLabel = document.createElement('label');
        postImageLabel.htmlFor = 'post-image-input';
        postImageLabel.innerText = 'Image';
        postImageFieldDiv.appendChild(postImageLabel);

        var postImageInput = document.createElement('input');
        postImageInput.className = 'form__input';
        postImageInput.id = postImageLabel.htmlFor;
        postImageFieldDiv.appendChild(postImageInput);

        var postCaptionFieldDiv = document.createElement('div');
        postCaptionFieldDiv.className = 'form__field';
        createPostForm.appendChild(postCaptionFieldDiv);

        var postCaptionLabel = document.createElement('label');
        postCaptionLabel.htmlFor = 'post-caption-input';
        postCaptionLabel.innerText = 'Caption';
        postCaptionFieldDiv.appendChild(postCaptionLabel);

        var postCaptionInput = document.createElement('input');
        postCaptionInput.className = 'form__input';
        postCaptionInput.id = postCaptionLabel.htmlFor;
        postCaptionFieldDiv.appendChild(postCaptionInput);

        var postSubmitButton = document.createElement('button');
        postSubmitButton.className = 'form__button';
        postSubmitButton.type = 'submit';
        postSubmitButton.innerText = 'Create';
        createPostForm.appendChild(postSubmitButton);

        var postCancelButton = document.createElement('button');
        postCancelButton.className = 'form__button';
        postCancelButton.type = 'reset';
        postCancelButton.innerText = 'Cancel';
        createPostForm.appendChild(postCancelButton);

        postCancelButton.onclick = function () {
            fader.removeChild(createPostSection);
            fader.style.display = 'none';
            document.removeEventListener('click', handler, true);
        }

        document.addEventListener('click', handler, true);

        function handler(e) {
            if (e.target === fader) {
                fader.removeChild(createPostSection);
                fader.style.display = 'none';
                document.removeEventListener('click', handler, true);
            }
        }
    }
    // ^^^^^^^^^^^^^^^Function to add posts^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^Create Main elements^^^^^^^^^^^^^^^
})();