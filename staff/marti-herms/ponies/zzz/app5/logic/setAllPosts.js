{
    const setAllPosts = (posts) => localStorage.posts = JSON.stringify(posts);

    logic.setAllPosts = setAllPosts;
}