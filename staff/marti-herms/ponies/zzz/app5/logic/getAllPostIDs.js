{
    const getAllPostIDs = () => {
        const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

        const postIDs = [];

        for (let i = 0; i < posts.length; i++) {
            postIDs.push(posts[i].id);
        }

        return postIDs;
    }

    logic.getAllPostIDs = getAllPostIDs
}