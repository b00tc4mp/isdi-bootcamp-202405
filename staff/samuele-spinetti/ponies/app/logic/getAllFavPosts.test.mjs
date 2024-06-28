import getAllFavPosts from './getAllFavPosts.mjs'

console.info('TEST getAllFavPosts')

console.info('CASE get all fav posts from samu2013')

sessionStorage.username = 'samu2103'

const favs = getAllFavPosts()

console.log(favs)