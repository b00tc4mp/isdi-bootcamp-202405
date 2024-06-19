(function () {
    try {
        var name = getUserName();

        var title = document.querySelector('h1');

        title.innerText = 'Hello, ' + name + '!';
    } catch (error) {
        alert(error.message);
    }

    var logoutButton = document.getElementById('logout-button');

    logoutButton.onclick = function () {
        try {
            logoutUser();

            location.href = '../login';
        } catch (error) {
            alert(error.message);
        }
    }

    var postListSection = document.createElement('section');
    postListSection.id = 'post-list-section'
    document.body.appendChild(postListSection);



    function newPosts(event) {
        event.preventDefault();

        var createPostTitle = document.createElement('h2');
        createPostTitle.innerText = 'Create Post';
        createPostSection.appendChild(createPostTitle);

        var createPostForm = document.createElement('form');
        createPostSection.appendChild(createPostForm);

        var postImageLabel = document.createElement('label');
        postImageLabel.htmlFor = 'post-image-input';
        postImageLabel.innerText = 'Image';
        createPostForm.appendChild(postImageLabel);

        var postImageInput = document.createElement('input');
        postImageInput.id = postImageLabel.htmlFor;
        createPostForm.appendChild(postImageInput);

        var postCaptionLabel = document.createElement('label');
        postCaptionLabel.htmlFor = 'post-text-input';
        postCaptionLabel.innerText = 'Comment';
        createPostForm.appendChild(postCaptionLabel);

        var postCaptionInput = document.createElement('input');
        postCaptionInput.id = postCaptionLabel.htmlFor;
        postCaptionInput.placeholder = 'Write your caption';
        createPostForm.appendChild(postCaptionInput);

        var postImageSubmit = document.createElement('button');
        postImageSubmit.type = 'submit';
        postImageSubmit.innerText = 'Post';
        createPostForm.appendChild(postImageSubmit);

        postImageSubmit.onclick = function (event) {
            event.preventDefault();

            try {
                addPost(postImageInput.value, postCaptionInput.value);

                document.getElementById('button-section').removeChild(createPostSection);

                document.getElementById('add-post-button').innerText = 'Add Post';

                addPostHasBeenClicked = false;

                clearPosts();
                generatePostList();
            } catch (error) {
                alert(error.message);
            }

        }
    }

    function clearPosts() {
        for (var i = postListSection.children.length - 1; i > -1; i--) {
            var child = postListSection.children[i]

            postListSection.removeChild(child)
        }
    }

    function generatePostList() {
        try {
            var posts = getAllPosts();

            posts.forEach(function (post) {
                var postArticle = document.createElement('article');
                postArticle.id = post.id;
                postListSection.appendChild(postArticle);

                var postAuthor = document.createElement('h3');
                postAuthor.innerText = post.author;
                postArticle.appendChild(postAuthor);

                var postImage = document.createElement('img');
                postImage.src = post.img;
                postArticle.appendChild(postImage);

                var postCaption = document.createElement('p');
                postCaption.innerText = post.caption;
                postArticle.appendChild(postCaption);

                var postDate = document.createElement('time');
                postDate.innerText = formatTime(new Date(post.date));
                postArticle.appendChild(postDate);

                if (post.author === getUserUsername()) {
                    var deletePostButton = document.createElement('button');
                    deletePostButton.innerText = 'Delete this post'
                    postArticle.appendChild(deletePostButton);

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
                    editCaptionPostButton.id = post.id
                    editCaptionPostButton.innerText = 'Edit this post'
                    postArticle.appendChild(editCaptionPostButton);

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
            });
        } catch (error) {
            alert(error.message);
        }

    }

    generatePostList();

    var addPostButton = document.getElementById('add-post-button');

    var addPostHasBeenClicked = false;
    var createPostSection;

    addPostButton.onclick = function (event) {
        if (!addPostHasBeenClicked) {
            addPostHasBeenClicked = true;

            addPostButton.innerText = 'Cancel'

            createPostSection = document.createElement('section');

            document.getElementById('button-section').appendChild(createPostSection);

            newPosts(event);
        } else {
            addPostHasBeenClicked = false;

            addPostButton.innerText = 'Add Post'

            document.getElementById('button-section').removeChild(createPostSection);
        }
    }


})();