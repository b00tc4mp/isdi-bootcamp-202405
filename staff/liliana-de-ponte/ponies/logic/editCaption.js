function editCaption(newCaption) {

    var posts = getAllPosts()
    var index = posts.findIndex(function (element) {

        return element.id === id
    })

    posts.splice(0, postCaption)

    localStorage.posts = JSON.stringify(posts)

}