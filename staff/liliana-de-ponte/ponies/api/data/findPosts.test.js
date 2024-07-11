import findPosts from "./findPosts.js";

const post1 = findPosts(post => post.author === 'lilideponte')

console.log(post1)