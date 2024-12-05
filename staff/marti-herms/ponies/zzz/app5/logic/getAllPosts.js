{
    const getAllPosts = () => {
        const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

        return posts;
    }

    logic.getAllPosts = getAllPosts;
}