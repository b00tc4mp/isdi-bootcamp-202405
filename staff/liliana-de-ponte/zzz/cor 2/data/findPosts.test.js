import findPosts from "./findPosts.js";

const post1 = findPosts(post => post.author === 'samuelespinetti')

console.log(post1)