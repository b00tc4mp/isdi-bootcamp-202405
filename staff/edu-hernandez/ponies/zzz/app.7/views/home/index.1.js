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

        if (!postImage.startsWith('http'))
            alert('invalid image')
        else {
            var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

            var post = {
                image: postImage,
                caption: postCaption,
                user: sessionStorage.username,
                date: new Date().toISOString()
            }

            posts.push(post)

            localStorage.posts = JSON.stringify(posts)

            document.body.removeChild(createPostSection)
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