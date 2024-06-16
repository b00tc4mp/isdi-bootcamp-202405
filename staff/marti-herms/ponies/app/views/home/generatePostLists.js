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
                var deletePostSubmit = document.createElement('button');
                deletePostSubmit.type = 'submit';
                deletePostSubmit.innerText = 'Delete this post'
                postArticle.appendChild(deletePostSubmit);

                deletePostSubmit.onclick = function (event) {
                    event.preventDefault();

                    deletePosts(posts[i].id);

                    section.removeChild(this.parentNode);
                }

                var editCaptionPost = document.createElement('button');
                editCaptionPost.id = posts[i].id
                editCaptionPost.innerText = 'Edit this post'
                postArticle.appendChild(editCaptionPost);

                editCaptionPost.onclick = function (event) {
                    event.preventDefault();

                    var captionEditLabel = document.createElement('label');
                    captionEditLabel.htmlFor = 'caption-edit-input';
                    captionEditLabel.innerText = 'New Caption';
                    postArticle.appendChild(captionEditLabel)

                    var captionEditInput = document.createElement('input');
                    captionEditInput.id = captionEditLabel.htmlFor;
                    captionEditInput.placeholder = 'Write your caption';
                    postArticle.appendChild(captionEditInput);

                    var captionEditSubmit = document.createElement('button');
                    captionEditSubmit.type = 'submit';
                    captionEditSubmit.innerText = 'Change';
                    postArticle.appendChild(captionEditSubmit);

                    captionEditSubmit.onclick = function (event) {
                        event.preventDefault();

                        editPost(posts[i].id, captionEditInput.value);

                        updatePostList();
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