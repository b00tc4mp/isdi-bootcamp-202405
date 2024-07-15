
import findPosts from "./findPosts.js"

const post1 = findPosts(post => post.author === 'mamoracho')

console.log(post1)