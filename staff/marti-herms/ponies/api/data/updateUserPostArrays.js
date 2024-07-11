import fs from 'fs';

function updateUserPostArrays(id) {
    let json = fs.readFileSync('./data/users.json', 'utf8');

    const users = json ? JSON.parse(json) : [];

    users.forEach((user) => {
        user.yourPosts = user.yourPosts.filter(postId => postId !== id);
        user.likedPosts = user.likedPosts.filter(postId => postId !== id);
        user.savedPosts = user.savedPosts.filter(postId => postId !== id);
    });

    json = JSON.stringify(users);

    fs.writeFileSync('./data/users.json', json);
}

export default updateUserPostArrays;