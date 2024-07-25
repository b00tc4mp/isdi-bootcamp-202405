import getAllFavPosts from './getAllFavPosts.js'

console.info('TEST getAllFavPosts')

console.info('CASE get all fav posts from mamoracho')

sessionStorage.username = 'mamoracho'

const favs = getAllFavPosts()

console.log(favs)