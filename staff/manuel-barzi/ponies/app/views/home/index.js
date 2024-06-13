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

    // TODO ...
}