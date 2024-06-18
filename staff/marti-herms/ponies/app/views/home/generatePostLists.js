function generatePostList(posts, section) {
    if (posts.length > 0) {
        for (let i = 0; i < posts.length; i++) {
            var postArticle = document.createElement('article');
            section.appendChild(postArticle);

            var postAuthor = document.createElement('h3');
            postAuthor.innerText = posts[i].author;
            postArticle.appendChild(postAuthor);

            var postImage = document.createElement('img');
            postImage.src = posts[i].img;
            postArticle.appendChild(postImage);

            var postCaption = document.createElement('p');
            postCaption.innerText = posts[i].caption;
            postArticle.appendChild(postCaption);

            var postDate = document.createElement('time');
            postDate.innerText = formatTime(new Date(posts[i].date));
            postArticle.appendChild(postDate);

            if (posts[i].author === getUserUsername()) {
                var deletePostButton = document.createElement('button');
                deletePostButton.innerText = 'Delete this post'
                postArticle.appendChild(deletePostButton);

                deletePostButton.onclick = function (event) {
                    if (confirm('Delete Post?')) {
                        try {
                            deletePosts(posts[i].id);

                            updatePostList();
                        } catch (error) {
                            alert(error.message);
                        }
                    }
                }

                var editCaptionPost = document.createElement('button');
                editCaptionPost.id = posts[i].id
                editCaptionPost.innerText = 'Edit this post'
                postArticle.appendChild(editCaptionPost);

                var editButtonHasBeenClicked = false;

                editCaptionPost.onclick = function () {
                    if (!editButtonHasBeenClicked) {
                        editButtonHasBeenClicked = true;

                        editCaptionPost.innerText = 'Cancel'

                        var createCaptionForm = document.createElement('form');
                        postArticle.appendChild(createCaptionForm);

                        var captionEditLabel = document.createElement('label');
                        captionEditLabel.htmlFor = 'caption-edit-input';
                        captionEditLabel.innerText = 'New Caption';
                        createCaptionForm.appendChild(captionEditLabel)

                        var captionEditInput = document.createElement('input');
                        captionEditInput.id = captionEditLabel.htmlFor;
                        captionEditInput.value = posts[i].caption;
                        createCaptionForm.appendChild(captionEditInput);

                        var captionEditButton = document.createElement('button');
                        captionEditButton.type = 'submit'
                        captionEditButton.innerText = 'Change';
                        createCaptionForm.appendChild(captionEditButton);

                        createCaptionForm.onsubmit = function (event) {
                            event.preventDefault();

                            if (confirm('Edit Post?')) {
                                try {
                                    editPost(posts[i].id, captionEditInput.value);

                                    updatePostList();
                                } catch (error) {
                                    alert(error.message)
                                }
                            }
                        }
                    } else {
                        editButtonHasBeenClicked = false;

                        editCaptionPost.innerText = 'Edit this post'

                        postArticle.removeChild(postArticle.querySelector('form'));
                    }
                }
            }
        }
    } else {
        var noPostText = document.createElement('h2');
        noPostText.innerText = 'No Posts Yet'
        section.appendChild(noPostText);
    }
}