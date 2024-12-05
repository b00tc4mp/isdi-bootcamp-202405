{
    const addPost = (img, caption) => {
        if (!img.startsWith('http')) {
            throw new Error('invalidImage');
        }
        const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

        const post = {
            id: generateId(),
            img: img,
            caption: caption,
            author: sessionStorage.username,
            date: new Date().toISOString(),
            likes: 0
        };

        posts.unshift(post);

        localStorage.posts = JSON.stringify(posts);

        const users = localStorage.users !== undefined ? JSON.parse(localStorage.users) : []

        const index = users.findIndex((user) => user.username === sessionStorage.username);

        users[index].yourPosts.push(post.id);

        localStorage.users = JSON.stringify(users);
    }

    logic.addPost = addPost;
}