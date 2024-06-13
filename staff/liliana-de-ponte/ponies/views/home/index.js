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

    var postImageLabel = document.createElement('label')
    postImageLabel.htmlFor = 'post-image-input'
    postImageLabel.innerText = 'Image'
    createPostForm.appendChild(postImageLabel)

    var postImageInput = document.createElement('input')
    postImageInput.id = postImageLabel.htmlFor
    createPostForm.appendChild(postImageInput)

    var postTextLabel = document.createElement('label')
    postTextLabel.htmlFor = 'post-text-input'
    postTextLabel.innerText = 'Description'
    createPostForm.appendChild(postTextLabel)

    var postTextInput = document.createElement('input')
    postTextInput.placeholder = 'Write here'
    postTextInput.id = postTextLabel.htmlFor
    createPostForm.appendChild(postTextInput)

    var postButtonSubmit = document.createElement('button')
    postButtonSubmit.type = 'submit'
    postButtonSubmit.classname = "submit-button"
    postButtonSubmit.id = 'submit-button'
    postButtonSubmit.innerText = "Submit"
    createPostForm.appendChild(postButtonSubmit)

    var form = document.querySelector('form')

    form.onsubmit = function (event) {
        event.preventDefault()

        var imageInput = document.getElementById('post-image-input')
        var descriptionInput = document.getElementById('post-text-input')

        var imageSource = imageInput.value
        var description = descriptionInput.value

        try {
            savePost(imageSource, description)

            alert('Successfully posted')
        } catch (error) {

            alert(error.message)

        }
    }
}
