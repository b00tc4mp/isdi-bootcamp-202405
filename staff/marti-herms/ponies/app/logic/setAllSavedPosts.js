{
    const setAllSavedPosts = (savedPosts) => {
        const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];


        for (let i = 0; i < savedPosts.length; i++) {
            posts.forEach(post => {
                if (post.id === savedPosts[i].id) {
                    post === savedPosts[i];
                }
            });

        }

        localStorage.posts = JSON.stringify(posts);
    }

    logic.setAllSavedPosts = setAllSavedPosts;
}