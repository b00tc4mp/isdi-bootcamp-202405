import findPosts from "./findPosts.js"

const postsFound = findPosts(post => post.author = 'Petazeta')

console.log(postsFound)