import updatePost from './updatePost.js'

const post = {
    "id": "abcdefghi",
    "author": "samu",
    "date": "11-07-2024",
    "caption": "Hello, soy Samu",
    "image": "https://njebvbeviobvo",
    "likes": []
}

updatePost(post => post.id === 'abcdefghi', post, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('Post updated')
})

