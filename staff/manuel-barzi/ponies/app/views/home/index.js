(function () {
    try {
        var name = getUserName()

        var title = document.querySelector('h1')

        title.innerText = 'Hello, ' + name + '!'
    } catch (error) {
        alert(error.message)
    }

    var logoutButton = document.getElementById('logout-button')

    logoutButton.onclick = function () {
        try {
            logoutUser()

            location.href = '../login'
        } catch (error) {
            alert(error.message)
        }
    }

    var addPostButton = document.getElementById('add-post-button')

    addPostButton.onclick = function () {
        var createPostSection = document.createElement('section')
        document.body.appendChild(createPostSection)

        var createPostTitle = document.createElement('h2')
        createPostTitle.innerText = 'Create Post'
        createPostSection.appendChild(createPostTitle)

        var createPostForm = document.createElement('form')
        createPostSection.appendChild(createPostForm)

        createPostForm.onsubmit = function (event) {
            event.preventDefault()

            //var postImageInput = document.getElementById('post-image-input')
            var postImage = postImageInput.value
            var postCaption = postCaptionInput.value

            try {
                createPost(postImage, postCaption)

                document.body.removeChild(createPostSection)

                clearPosts()
                listPosts()
            } catch (error) {
                alert(error.message)
            }
        }

        var postImageLabel = document.createElement('label')
        postImageLabel.htmlFor = 'post-image-input'
        postImageLabel.innerText = 'Image'
        createPostForm.appendChild(postImageLabel)

        var postImageInput = document.createElement('input')
        postImageInput.id = postImageLabel.htmlFor
        createPostForm.appendChild(postImageInput)

        var postCaptionLabel = document.createElement('label')
        postCaptionLabel.htmlFor = 'post-caption-input'
        postCaptionLabel.innerText = 'Caption'
        createPostForm.appendChild(postCaptionLabel)

        var postCaptionInput = document.createElement('input')
        postCaptionInput.id = postCaptionLabel.htmlFor
        createPostForm.appendChild(postCaptionInput)

        var postSubmitButton = document.createElement('button')
        postSubmitButton.type = 'submit'
        postSubmitButton.innerText = 'Create'
        createPostForm.appendChild(postSubmitButton)

        var postCancelButton = document.createElement('button')
        postCancelButton.type = 'reset'
        postCancelButton.innerText = 'Cancel'
        createPostForm.appendChild(postCancelButton)

        postCancelButton.onclick = function () {
            document.body.removeChild(createPostSection)
        }
    }

    var postListSection = document.createElement('section')
    document.body.appendChild(postListSection)

    function clearPosts() {
        for (var i = postListSection.children.length - 1; i > -1; i--) {
            var child = postListSection.children[i]

            postListSection.removeChild(child)
        }
    }

    function listPosts() {
        try {
            var posts = getAllPosts()

            posts.forEach(function (post) {
                var postArticle = document.createElement('article')
                postListSection.appendChild(postArticle)

                var postAuthorTitle = document.createElement('h3')
                postAuthorTitle.innerText = post.author
                postArticle.appendChild(postAuthorTitle)

                var postImage = document.createElement('img')
                postImage.src = post.image
                postArticle.appendChild(postImage)

                var postCaptionText = document.createElement('p')
                postCaptionText.innerText = post.caption
                postArticle.appendChild(postCaptionText)

                var postDateTime = document.createElement('time')
                postDateTime.innerText = formatTime(new Date(post.date))
                postArticle.appendChild(postDateTime)

                if (post.author === getUserUsername()) {
                    var postDeleteButton = document.createElement('button')
                    postDeleteButton.innerText = 'Delete'
                    postArticle.appendChild(postDeleteButton)

                    postDeleteButton.onclick = function () {
                        if (confirm('Delete post?'))
                            try {
                                deletePost(post.id)

                                clearPosts()
                                listPosts()
                            } catch (error) {
                                alert(error.message)

                                if (error.message === 'post not found') {
                                    clearPosts()
                                    listPosts()
                                }
                            }
                    }

                    var editButton = document.createElement('button')
                    editButton.innerText = 'Edit'
                    postArticle.appendChild(editButton)

                    editButton.onclick = function () {

                        var editCaptionForm = document.createElement('form')
                        postArticle.appendChild(editCaptionForm)

                        var editCaptionLabel = document.createElement('label')
                        editCaptionLabel.htmlFor = 'edit-caption-input'
                        editCaptionForm.appendChild(editCaptionLabel)

                        var editCaptionInput = document.createElement('input')
                        editCaptionInput.id = editCaptionLabel.htmlFor
                        editCaptionInput.value = post.caption
                        editCaptionForm.appendChild(editCaptionInput)

                        var editCaptionSubmitButton = document.createElement('button')
                        editCaptionSubmitButton.type = 'submit'
                        editCaptionSubmitButton.innerText = 'Save'
                        editCaptionForm.appendChild(editCaptionSubmitButton)

                        var editCaptionCancelButton = document.createElement('button')
                        editCaptionCancelButton.innerText = 'Cancel'
                        editCaptionCancelButton.type = 'button'
                        editCaptionForm.appendChild(editCaptionCancelButton)

                        editCaptionCancelButton.onclick = function () {
                            postArticle.removeChild(editCaptionForm)
                        }

                        editCaptionForm.onsubmit = function (event) {
                            event.preventDefault()

                            try {
                                var newCaption = editCaptionInput.value

                                updatePostCaption(post.id, newCaption)

                                postArticle.removeChild(editCaptionForm)

                                clearPosts()
                                listPosts()
                            } catch (error) {
                                alert(error.message)

                                if (error.message === 'post not found') {
                                    clearPosts()
                                    listPosts()
                                }
                            }
                        }
                    }
                }
            })
        } catch (error) {
            alert(error.message)
        }
    }

    listPosts()
})()