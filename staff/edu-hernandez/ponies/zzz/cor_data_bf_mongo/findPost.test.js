import findPost from './findPost.js'

const postId = findPost(post => post.id === 'randomId_2')

console.log(postId)