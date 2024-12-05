import data from "../data/index.mjs";

const editUserInfo = (avatar, username, /*newPassword,*/ oldPassword) => {
    const user = data.findUser(user => user.username === sessionStorage.username);

    if (oldPassword !== user.password) {
        throw new Error('wrong password');
    }

    // if (newPassword === oldPassword) {
    //     throw new Error('the passwords must be different');
    // }

    if (user.avatar !== avatar) {
        user.avatar = avatar;

        data.updateUser(user => user.username === sessionStorage.username, user);
    }

    if (username && user.username !== username) {
        const posts = data.findPosts(post => post.author === user.username);

        posts.forEach(post => post.author = username);

        data.updatePosts(posts);

        const likedPosts = data.findPosts(post => user.likedPosts.includes(post.id));

        likedPosts.forEach((post) => {
            const index = post.likes.findIndex(username => username === user.username);
            post.likes[index] = username;
        })

        data.updatePosts(likedPosts);

        user.username = username;

        data.updateUser(user => user.username === sessionStorage.username, user);

        sessionStorage.username = username;
    }

    // if (password) {
    //     user.password = newPassword;
    // }
}

export default editUserInfo;