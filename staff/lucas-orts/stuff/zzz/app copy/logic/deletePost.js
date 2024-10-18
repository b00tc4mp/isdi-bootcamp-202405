function deletePost(id) {

    var posts = getAllPosts()
    var index = posts.findIndex(function (element) {

        return element.id === id

    })

    posts.splice(index, 1)

    localStorage.posts = JSON.stringify(posts)

}