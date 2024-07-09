import getAllFollowPosts from './getAllFollowPosts.mjs'

console.info('TEST getAllFollowPosts')

console.info('CASE get all follow posts from lilidp')

sessionStorage.username = 'lilidp'

const follows = getAllFollowPosts()

console.log(follows)