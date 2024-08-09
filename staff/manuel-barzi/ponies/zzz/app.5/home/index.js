try {
    var name = getUserName()

    var title = document.querySelector('h1')

    title.innerText = 'Hello, ' + name + '!'
} catch (error) {
    alert(error.message)
}