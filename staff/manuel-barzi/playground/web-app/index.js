const express = require('express')
const fs = require('fs')

const users = [
    {
        username: 'empanao',
        password: '123123123'
    },
    {
        username: 'enfadao',
        password: '123123123'
    },
    {
        username: 'encendia',
        password: '123123123'
    }
]

const server = express()

server.get('/login', (req, res) => {
    const { cookie } = req.headers

    if (cookie) {
        const username = cookie.split('=')[1]

        if (username && users.some(user => user.username === username)) {
            res.redirect('/')

            return
        }
    }

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

        const user = users.find(user => user.username === username)

        if (!user || user.password !== password) {
            const authError = fs.readFileSync('./auth-error.html')

            res.setHeader('Content-Type', 'text/html')

            res.send(authError)

            return
        }

        res.setHeader('set-cookie', `username=${username}`)

        res.redirect('/')
    })
})

server.get('/', (req, res) => {
    const { cookie } = req.headers

    if (!cookie) {
        res.redirect('/login')

        return
    }

    const username = cookie.split('=')[1]

    if (!username || !users.some(user => user.username === username)) {
        res.redirect('/login')

        return
    }

    const home = fs.readFileSync('./home.html')

    res.setHeader('Content-Type', 'text/html')

    res.send(home)
})

server.post('/logout', (req, res) => {
    res.clearCookie('username')

    res.redirect('/login')
})

server.listen(8080, () => console.info('server up'))