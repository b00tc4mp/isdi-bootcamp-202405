(function () {

    //-----------HEADER------------------
    const body = new Component(document.body)

    const header = new Header
    body.add(header)

    const userName = new TextHomeHeader
    header.add(userName)

    try {

        const name = getUserName()

        userName.setText('Hello, ' + name + '!')
    } catch (error) {

        alert(error.message)
    }
    //-----------------------------------------

    //-----LOGOUT BUTTON---------------

    const logoutButton = new LogoutButton
    header.add(logoutButton)

    logoutButton.onClick(function () {
        try {
            logoutUser()

            location.href = '../login'
        } catch (error) {
            alert(error.message)
        }
    })


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

                //se crea la etiqueta article con dentro una clase (<article class='post'>aqui dentro va todo lo que hay abajo</article>)
                const postArticle = document.createElement('article')
                postArticle.className = 'post'
                postListSection.appendChild(postArticle)

                //se crea una etiqueta de h3 con una clase dentro y se pone el nombre del autor del post y se añade todo a la etqueta <article> (<h3 class='post__author'>nombre del autor del post (post.author)</h3>)
                const postAuthorTitle = document.createElement('h3')
                postAuthorTitle.className = 'post__author'
                postAuthorTitle.innerText = post.author
                postArticle.appendChild(postAuthorTitle)

                //se crea una etiqueta de img con una clase dentro y en el src se mete el link del post.image y se añade todo al post que esta dentro de la etiqueta <article>(<img class='pst__image src= http(post.image)>)
                const postImage = document.createElement('img')
                postImage.className = 'post__image'
                postImage.src = post.image
                postArticle.appendChild(postImage)

                // se crea una etiqueta p <p> con una clase dentro y el comentario del post y se añade a todo el post que está dentro de la etiqueta <article> (<p class='post__caption'>post.caption(comentario del post)</p>)
                const postCaptionText = document.createElement('p')
                postCaptionText.className = 'post__caption'
                postCaptionText.innerText = post.caption
                postArticle.appendChild(postCaptionText)

                //si el nombre del autor está dentro de getUserUserName hace lo que esta dentro de las llaves.
                if (post.author === getUserUsername()) {

                    // se crea la etiqueta div con una clase llamada post__actions (<div class='post__actions')
                    const postActionButtonsDiv = document.createElement('div')
                    postActionButtonsDiv.className = 'post__actions'
                    postArticle.appendChild(postActionButtonsDiv)

                    //se crea un boton con el nombre 'Delete'
                    const postDeleteButton = document.createElement('button')
                    postDeleteButton.innerText = 'Delete'
                    postActionButtonsDiv.appendChild(postDeleteButton)

                    //cuando se hace click en el boton de delete:
                    postDeleteButton.onclick = function () {

                        if (confirm('Delete post?')) {

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

                    }

                    // se crea un boton con el nombre Edit y se mete en la etiqueta <div>
                    const editButton = document.createElement('button')
                    editButton.innerText = 'Edit'
                    postActionButtonsDiv.appendChild(editButton)

                    editButton.onclick = function () {

                        //esto crea la etiqueta form
                        const editCaptionForm = document.createElement('form')
                        postArticle.appendChild(editCaptionForm)

                        //esto crea una etiqueta label
                        const editCaptionLabel = document.createElement('label')
                        //htmlFor crea el for que hay dentro del label que se asocia a la id <label for='edit-caption-input'
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

                                editCaption(post.id, newCaption)

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

        const postImageFieldDiv = new FormFieldDiv
        createPostForm.appendChild(postImageFieldDiv.container)

        const postImageLabel = document.createElement('label')
        postImageLabel.htmlFor = 'post-image-input'
        postImageLabel.innerText = 'Image'
        postImageFieldDiv.container.appendChild(postImageLabel)

        const postImageInput = document.createElement('input')
        postImageInput.className = 'form__input'
        postImageInput.id = postImageLabel.htmlFor
        postImageFieldDiv.container.appendChild(postImageInput)

        const postCaptionFieldDiv = new FormFieldDiv
        createPostForm.appendChild(postCaptionFieldDiv.container)

        const postCaptionLabel = document.createElement('label')
        postCaptionLabel.htmlFor = 'post-caption-input'
        postCaptionLabel.innerText = 'Caption'
        postCaptionFieldDiv.container.appendChild(postCaptionLabel)

        const postCaptionInput = document.createElement('input')
        postCaptionInput.className = 'form__input'
        postCaptionInput.id = postCaptionLabel.htmlFor
        postCaptionFieldDiv.container.appendChild(postCaptionInput)

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
})()
