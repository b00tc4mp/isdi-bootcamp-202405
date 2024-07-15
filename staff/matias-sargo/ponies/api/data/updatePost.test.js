import updatePost from './updatePost.js'
import findPost from "./findPost.js";

const post = {
    id:"av5hkj8l780",
    image:"https://media.giphy.com/media/mLZ6kvGkH31z0BAKUX/g…03w5jcthlc&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
    caption:"hola mundooo",
    author:"mamoracho",
    date:"2024-07-11T13:19:38.661Z"
}

updatePost(posts => posts.id === "av5hkj8l780", post)



const postModified = findPost(post => post.id === 'av5hkj8l780')

console.log(postModified)