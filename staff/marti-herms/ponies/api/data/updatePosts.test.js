import findPosts from './findPosts.js'

import updatePosts from './updatePosts.js';

const posts = findPosts(post => post.author === 'eden');

posts.forEach(post => post.author = 'Eden');

updatePosts(posts)