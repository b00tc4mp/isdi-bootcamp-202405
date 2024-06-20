(function () {
    const header = document.createElement('header')
    header.className = 'header'
    document.body.appendChild(header)

    const userName = document.createElement('p')
    userName.className = 'header__user-name'
    header.appendChild(userName)

    try {
        const name = getUserName()

        userName.innerText = 'Hello, ' + name + '!'
    } catch (error) {
        alert(error.message)
    }

    const logoutButton = document.createElement('button')
    logoutButton.className = 'logout-button'
    logoutButton.innerText = 'Logout'
    header.appendChild(logoutButton)

    logoutButton.onclick = function () {
        try {
            logoutUser()

            location.href = '../login'
        } catch (error) {
            alert(error.message)
        }
    }


    const main = document.createElement('main')
    main.className = 'view main'
    document.body.appendChild(main)

    const postListSection = document.createElement('section')
    postListSection.className = 'post-list'
    main.appendChild(postListSection)

    function clearPosts() {
        for (let i = postListSection.children.length - 1; i > -1; i--) {
            const child = postListSection.children[i]

            postListSection.removeChild(child)
        }
    }

    function listPosts() {
        try {
            const posts = getAllPosts()

            posts.forEach(function (post) {
                const postArticle = document.createElement('article')
                postArticle.className = 'post'
                postListSection.appendChild(postArticle)

                const postAuthorTitle = document.createElement('h3')
                postAuthorTitle.className = 'post__author'
                postAuthorTitle.innerText = post.author
                postArticle.appendChild(postAuthorTitle)

                const postImage = document.createElement('img')
                postImage.className = 'post__image'
                postImage.src = post.image
                postArticle.appendChild(postImage)

                const postCaptionText = document.createElement('p')
                postCaptionText.className = 'post__caption'
                postCaptionText.innerText = post.caption
                postArticle.appendChild(postCaptionText)

                if (post.author === getUserUsername()) {
                    const postActionButtonsDiv = document.createElement('div')
                    postActionButtonsDiv.className = 'post__actions'
                    postArticle.appendChild(postActionButtonsDiv)

                    const postDeleteButton = document.createElement('button')
                    postDeleteButton.innerText = 'Delete'
                    postActionButtonsDiv.appendChild(postDeleteButton)

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

                    const editButton = document.createElement('button')
                    editButton.innerText = 'Edit'
                    postActionButtonsDiv.appendChild(editButton)

                    editButton.onclick = function () {

                        const editCaptionForm = document.createElement('form')
                        postArticle.appendChild(editCaptionForm)

                        const editCaptionLabel = document.createElement('label')
                        editCaptionLabel.htmlFor = 'edit-caption-input'
                        editCaptionForm.appendChild(editCaptionLabel)

                        const editCaptionInput = document.createElement('input')
                        editCaptionInput.id = editCaptionLabel.htmlFor
                        editCaptionInput.value = post.caption
                        editCaptionForm.appendChild(editCaptionInput)

                        const editCaptionSubmitButton = document.createElement('button')
                        editCaptionSubmitButton.type = 'submit'
                        editCaptionSubmitButton.innerText = 'Save'
                        editCaptionForm.appendChild(editCaptionSubmitButton)

                        const editCaptionCancelButton = document.createElement('button')
                        editCaptionCancelButton.innerText = 'Cancel'
                        editCaptionCancelButton.type = 'button'
                        editCaptionForm.appendChild(editCaptionCancelButton)

                        editCaptionCancelButton.onclick = function () {
                            postArticle.removeChild(editCaptionForm)
                        }

                        editCaptionForm.onsubmit = function (event) {
                            event.preventDefault()

                            try {
                                const newCaption = editCaptionInput.value

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

                const postDateTime = document.createElement('time')
                postDateTime.className = 'post__time'
                postDateTime.innerText = formatTime(new Date(post.date))
                postArticle.appendChild(postDateTime)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    listPosts()

    const footer = document.createElement('footer')
    footer.className = 'footer'
    document.body.appendChild(footer)

    const addPostButton = document.createElement('button')
    addPostButton.className = 'add-post-button'
    addPostButton.innerText = '+'
    footer.appendChild(addPostButton)

    addPostButton.onclick = function () {
        const createPostSection = document.createElement('section')
        createPostSection.className = 'create-post-section'
        footer.appendChild(createPostSection)

        const createPostTitle = document.createElement('h2')
        createPostTitle.className = 'create-post-section__title'
        createPostTitle.innerText = 'Create Post'
        createPostSection.appendChild(createPostTitle)

        const createPostForm = document.createElement('form')
        createPostForm.className = 'form'
        createPostSection.appendChild(createPostForm)

        createPostForm.onsubmit = function (event) {
            event.preventDefault()

            // const postImageInput = document.getElementById('post-image-input')
            const postImage = postImageInput.value
            const postCaption = postCaptionInput.value

            try {
                createPost(postImage, postCaption)

                footer.removeChild(createPostSection)

                clearPosts()
                listPosts()
            } catch (error) {
                alert(error.message)
            }
        }

        const postImageFieldDiv = document.createElement('div')
        postImageFieldDiv.className = 'form__field'
        createPostForm.appendChild(postImageFieldDiv)

        const postImageLabel = document.createElement('label')
        postImageLabel.htmlFor = 'post-image-input'
        postImageLabel.innerText = 'Image'
        postImageFieldDiv.appendChild(postImageLabel)

        const postImageInput = document.createElement('input')
        postImageInput.className = 'form__input'
        postImageInput.id = postImageLabel.htmlFor
        postImageFieldDiv.appendChild(postImageInput)

        const postCaptionFieldDiv = document.createElement('div')
        postCaptionFieldDiv.className = 'form__field'
        createPostForm.appendChild(postCaptionFieldDiv)

        const postCaptionLabel = document.createElement('label')
        postCaptionLabel.htmlFor = 'post-caption-input'
        postCaptionLabel.innerText = 'Caption'
        postCaptionFieldDiv.appendChild(postCaptionLabel)

        const postCaptionInput = document.createElement('input')
        postCaptionInput.className = 'form__input'
        postCaptionInput.id = postCaptionLabel.htmlFor
        postCaptionFieldDiv.appendChild(postCaptionInput)

        const postButtonsDiv = document.createElement('div')
        postButtonsDiv.className = 'create-post-section__buttons'
        createPostForm.appendChild(postButtonsDiv)

        const postSubmitButton = document.createElement('button')
        postSubmitButton.className = 'form__button'
        postSubmitButton.type = 'submit'
        postSubmitButton.innerText = 'Create'
        postButtonsDiv.appendChild(postSubmitButton)

        const postCancelButton = document.createElement('button')
        postCancelButton.className = 'form__button'
        postCancelButton.innerText = 'Cancel'
        postCancelButton.type = 'reset'
        postButtonsDiv.appendChild(postCancelButton)

        postCancelButton.onclick = function () {
            footer.removeChild(createPostSection)
        }
    }
})()