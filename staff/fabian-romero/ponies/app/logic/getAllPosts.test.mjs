import getAllFavPosts from './getAllFavPosts.mjs'

console.info('TEST getAllFavPosts')
console.info('CASE get all fav posts from fabito ')

sessionStorage.username = 'fabito'

const favs = getAllFavPosts()

console.log(favs)