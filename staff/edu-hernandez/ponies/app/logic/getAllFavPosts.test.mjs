import getAllFavPosts from './getAllFavPosts.mjs'

console.info('TEST getAllFavPosts')

console.info('CASE get all fav posts from eduhv')

sessionStorage.username = 'eduhv'

const favs = getAllFavPosts()

console.log(favs)