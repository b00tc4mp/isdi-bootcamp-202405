const xhr = new XMLHttpRequest

xhr.onload = () => {
    if (xhr.status === 200) {
        const posts = JSON.parse(xhr.response)

        console.log(posts)

        return
    }

    const { error, message } = JSON.parse(xhr.response)

    console.error(error, message)
}

xhr.onerror = () => console.error('network error')

xhr.open('GET', 'http://localhost:8080/posts')
xhr.setRequestHeader('Authorization', 'Basic samu')
xhr.send()

console.log('continue...')

console.log('block')
let before = Date.now()
while (Date.now() - before < 5000);
console.log('unblocked')

// VM637:23 continue...
// VM637:25 block
// VM637:28 unblocked
// undefined
// VM637:7 (6) [{…}, {…}, {…}, {…}, {…}, {…}]