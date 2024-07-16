const express = require('express')
const fs = require('fs')

const server = express()

server.get('/', (req, res) => {
    const html = fs.readFileSync('./login.html')

    res.setHeader('Content-Type', 'text/html')

    res.send(html)
})

server.get('/index.css', (req, res) => {
    const css = fs.readFileSync('./index.css')

    res.setHeader('Content-Type', 'text/css')

    res.send(css)
})


server.get('/favicon.ico', (req, res) => {
    const favicon = fs.readFileSync('./favicon.ico')

    res.setHeader('Content-Type', 'image/vnd.microsoft.icon')

    res.send(favicon)
})

server.post('/auth', (req, res) => {
    req.on('data', data => {
        // username=peterpan&password=123123123

        const [username, password] = data.toString().split('&').map(field => field.split('=')[1])

        if (username === 'peterpan' && password === '123123123') {
            res.setHeader('set-cookie', 'auth=true')

            res.redirect('/home')
        } else {
            const authError = fs.readFileSync('./auth-error.html')

            res.setHeader('Content-Type', 'text/html')

            res.send(authError)
        }

    })
})

server.get('/home', (req, res) => {
    const { cookie } = req.headers

    if (!cookie) {
        res.redirect('/')

        return
    }

    const auth = cookie.split('=')[1]

    if (!auth) {
        res.redirect('/')

        return
    }

    const home = fs.readFileSync('./home.html')

    res.setHeader('Content-Type', 'text/html')

    res.send(home)
})

server.listen(8080, () => console.info('server up'))