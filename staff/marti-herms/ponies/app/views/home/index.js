try {
    var name = getUserName();

    var title = document.querySelector('h1');

    var posts = getAllPosts();

    var postListSection = document.createElement('section');
    postListSection.id = 'post-list-section'
    document.body.appendChild(postListSection);

    generatePostList(posts, postListSection);

    title.innerText = 'Hello, ' + name + '!';
} catch (error) {
    alert(error.message);
}

var logoutButton = document.getElementById('logout-button');

logoutButton.onclick = function () {
    try {
        logoutUser();

        location.href = '../login';
    } catch (error) {
        alert(error.message);
    }
}

var addPostButton = document.getElementById('add-post-button');

var addPostHasBeenClicked = false;
var createPostSection;

addPostButton.onclick = function (event) {
    if (!addPostHasBeenClicked) {
        addPostHasBeenClicked = true;

        addPostButton.innerText = 'Cancel'

        createPostSection = document.createElement('section');

        document.getElementById('button-section').appendChild(createPostSection);

        newPosts(event);
    } else {
        addPostHasBeenClicked = false;

        addPostButton.innerText = 'Add Post'

        document.getElementById('button-section').removeChild(createPostSection);
    }
}

/*var showPostButton = document.getElementById('show-post-button');

var showPostHasBeenClicked = false;

var postListSection

showPostButton.onclick = function (event) {
    event.preventDefault()
    if (!showPostHasBeenClicked) {
        showPostHasBeenClicked = true;

        document.getElementById('show-post-button').innerText = 'Hide Posts'

        var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

        postListSection = document.createElement('section');
        document.body.appendChild(postListSection);

        generatePostList(posts, postListSection);
    } else {
        showPostHasBeenClicked = false;

        document.getElementById('show-post-button').innerText = 'Show Posts'

        document.body.removeChild(postListSection);
    }

}*/