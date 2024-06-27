{
    const addSavedPost = (postId) => {
        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];

        const index = users.findIndex(user => user.username === sessionStorage.username);

        users[index].savedPosts.push(postId);

        localStorage.users = JSON.stringify(users);
    }

    logic.addSavedPost = addSavedPost;
}