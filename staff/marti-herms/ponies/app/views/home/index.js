try {
    var name = getUserName();

    var title = document.querySelector('h1');

    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];
    var postListSection = document.getElementById('post-list');

    generatePostList()

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

addPostButton.onclick = function () {
    newPosts();
}

var postSection = document.createElement('section');
document.body.appendChild(postSection);

var postImage = document.createElement('img');
