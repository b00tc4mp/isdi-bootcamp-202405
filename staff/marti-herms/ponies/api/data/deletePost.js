import fs from 'fs';

function deletePost(condition) {
    let json = fs.readFileSync('./data/posts.json', 'utf8');

    const posts = json ? JSON.parse(json) : []

    const postIndex = posts.findIndex(condition)

    if (postIndex > -1) {
        posts.splice(postIndex, 1)

        json = JSON.stringify(posts)

        fs.writeFileSync('./data/posts.json', json);
    }
}

export default deletePost