{
    const home = new Component(document.body)
    const header = new Header
    home.add(header)

    const body = new Component(document.createElement('main'))
    body.setClassName('view main')
    home.add(body)

    const postList = new PostList
    body.add(postList)

    postList.listPosts()

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

            //const postImageInput = document.getElementById('post-image-input')
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
        postCancelButton.type = 'reset'
        postCancelButton.innerText = 'Cancel'
        postButtonsDiv.appendChild(postCancelButton)

        postCancelButton.onclick = function () {
            footer.removeChild(createPostSection)
        }
    }
}