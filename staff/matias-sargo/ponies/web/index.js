import express from 'express'
import fs from 'fs'

import logic from 'cor/logic/index.js'


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

server.post('/login', (req, res) => {
    req.on('data', data => {
        const [username, password] = decodeURIComponent(data.toString()).replace('+', ' ').split('&').map(field => field.split('=')[1])


        try {
            logic.authenticateUser(username, password)

            res.setHeader('set-cookie', `username=${username}`)

            res.redirect('/')
        } catch (error) {
            const login = fs.readFileSync('./login.html', 'utf-8')

            res.setHeader('Content-Type', 'text/html')

            res.send(login
                .replace('<p></p>', `<p>${error.message}</p>`)
                .replace('placeholder="username"', `placeholder="username" value="${username}"`)
            )
        }
    })
})

server.get('/register', (req, res) => {
    const { cookie } = req.headers

    if (cookie) {
        const username = cookie.split('=')[1]

        if (username && users.some(user => user.username === username)) {
            res.redirect('/')

            return
        }
    }

    const html = fs.readFileSync('./register.html')

    res.setHeader('Content-Type', 'text/html')

    res.send(html)
})

server.post('/register', (req, res) => {
    req.on('data', data => {
        const [name, surname, email, username, password, passwordRepeat] = decodeURIComponent(data.toString()).replace('+', ' ').split('&').map(field => field.split('=')[1])

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            res.redirect('/login')
        } catch (error) {
            const register = fs.readFileSync('./register.html', 'utf-8')

            res.setHeader('Content-Type', 'text/html')

            res.send(register
                .replace('<p></p>', `<p>${error.message}</p>`)
                .replace('placeholder="name"', `placeholder="name" value="${name}"`)
                .replace('placeholder="surname"', `placeholder="surname" value="${surname}"`)
                .replace('placeholder="email"', `placeholder="email" value="${email}"`)
                .replace('placeholder="username"', `placeholder="username" value="${username}"`)
            )
        }
    })
})

server.get('/index.css', (req, res) => {
    const css = fs.readFileSync('./index.css')

    res.setHeader('Content-Type', 'text/css')

    res.send(css)
})


// server.get('/favicon.ico', (req, res) => {
//     const favicon = fs.readFileSync('./favicon.ico')

//     res.setHeader('Content-Type', 'image/vnd.microsoft.icon')

//     res.send(favicon)
// })

server.get('/', (req, res) => {
    const { cookie } = req.headers

    if (!cookie) {
        res.redirect('/login')

        return
    }

    const username = cookie.split('=')[1]

    try {
        const name = logic.getUserName(username)

        const home = fs.readFileSync('./home.html', 'utf-8')

        res.setHeader('Content-Type', 'text/html')

        res.send(home.replace('World', name))
    } catch (error) {
        res.redirect('/login')
    }
})

server.post('/logout', (req, res) => {
    res.clearCookie('username')

    res.redirect('/login')
})

server.listen(8080, () => console.info('server up'))