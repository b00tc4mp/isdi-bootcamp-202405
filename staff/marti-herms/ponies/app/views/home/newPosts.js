function newPosts(event) {
    event.preventDefault();
    //addPostButton.disabled = true;



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

    var postTextLabel = document.createElement('label');
    postTextLabel.htmlFor = 'post-text-input';
    postTextLabel.innerText = 'Comment';
    createPostForm.appendChild(postTextLabel);

    var postTextInput = document.createElement('input');
    postTextInput.id = postTextLabel.htmlFor;
    postTextInput.placeholder = 'Write your comment'
    createPostForm.appendChild(postTextInput);

    var postImageSubmit = document.createElement('button');
    postImageSubmit.type = 'submit';
    postImageSubmit.innerText = 'Post';
    createPostForm.appendChild(postImageSubmit);

    postImageSubmit.onclick = function (event) {
        event.preventDefault();
        addPost(postImageInput.value, postTextInput.value);
        document.getElementById('add-post').removeChild(createPostSection);
    }
}