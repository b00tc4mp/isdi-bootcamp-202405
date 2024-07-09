import getAllFavPosts from './getAllFavPosts.mjs'

console.info('TEST getAllFavPosts')

console.info('CASE get all fav posts from lilidp')

sessionStorage.username = 'lilidp'

const favs = getAllFavPosts()

console.log(favs)