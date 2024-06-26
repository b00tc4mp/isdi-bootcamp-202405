{
    const getAllSavedPosts = () => {
        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];
        const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

        const index = users.findIndex((user) => user.username === sessionStorage.username);

        const postIDs = users[index].savedPosts;

        const savedPosts = [];

        for (let i = 0; i < postIDs.length; i++) {
            savedPosts.push(posts.find((post) => post.id === postIDs[i]));
        }

        return savedPosts;
    }

    logic.getAllSavedPosts = getAllSavedPosts;
}