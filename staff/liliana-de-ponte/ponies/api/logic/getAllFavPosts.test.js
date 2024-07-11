import getAllFavPosts from './getAllFavPosts.js'

console.info('TEST getAllFavPosts')

console.info('CASE get all fav posts from lilidp')

sessionStorage.username = 'lilidp'

const favs = getAllFavPosts()

console.log(favs)