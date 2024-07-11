import fs from 'fs';

function updatePosts(posts) {
    let json = fs.readFileSync('./data/posts.json', 'utf8');

    const oldPosts = json ? JSON.parse(json) : [];

    posts.forEach(post => {
        const index = oldPosts.findIndex(oldPost => oldPost.id === post.id);
        if (index !== -1) {
            oldPosts.splice(index, 1, post);
        }
    })

    json = JSON.stringify(oldPosts);

    fs.writeFileSync('./data/posts.json', json)
}

export default updatePosts