import data from '../data/index.mjs'

const toggleUserFollow = (author) => {
    const user = data.findUser(user => user.username === sessionStorage.username);

    if (user.username === author) {
        throw new Error('You can\'t follow yourself');
    }

    const authorUser = data.findUser(user => user.username === author);


    const followingIndex = user.following.findIndex(username => username === author);

    const followerIndex = authorUser.followers.findIndex(username => username === user.username);


    if ((followingIndex === -1 && followerIndex !== -1) || (followerIndex === -1 && followingIndex !== -1)) {
        throw new Error('something is wrong');
    }


    if (followingIndex !== -1) {
        user.following.splice(followingIndex, 1);
    } else {
        user.following.push(author);
    }


    if (followerIndex !== -1) {
        authorUser.followers.splice(followerIndex, 1);
    } else {
        authorUser.followers.push(user.username);
    }


    data.updateUser(user => user.username === sessionStorage.username, user);
    data.updateUser(user => user.username === author, authorUser);
}

export default toggleUserFollow