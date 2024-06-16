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

            updatePostList();
        } catch (error) {
            alert(error.message);
        }

    }
}