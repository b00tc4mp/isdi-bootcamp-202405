import findPost from './findPost.js'

const postId = findPost(post => post.id === 'abcdefghi')

console.log(postId)