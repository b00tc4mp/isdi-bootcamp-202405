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

    //var postImage = document.createElement('img')
    //postImage.src = ''
    //postImage.alt = ''

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
    postButtonSubmit.className = 'submit-button'
    postButtonSubmit.id = 'submit-button'
    postButtonSubmit.innerText = 'Submit'
    createPostForm.appendChild(postButtonSubmit)

    addPostButton.onclick = null

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

            form.reset()
        } catch (error) {
            alert(error.message)
        }
    }

}


var showPostButton = document.getElementById('show-post-button')

showPostButton.onclick = function () {

    var image = JSON.parse(localStorage.posts)

    for (var i = 0; i < image.length; i++) {

        var createPostSection = document.createElement('section')
        document.body.appendChild(createPostSection)

        var createPostTitle = document.createElement('h2')
        createPostTitle.innerText = image[i].description
        createPostSection.appendChild(createPostTitle)

        var showPost = document.createElement('img')
        showPost.src = image[i].src
        //showPost.width = "50px"
        //showPost.height = "50px"
        createPostSection.appendChild(showPost)
    }

    showPostButton.onclick = null


}