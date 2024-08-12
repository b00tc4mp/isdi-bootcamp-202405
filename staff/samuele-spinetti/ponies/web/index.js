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

server.get('/index.css', (req, res) => {
    const css = fs.readFileSync('./index.css')

    res.setHeader('Content-Type', 'text/css')

    res.send(css)
})

server.post('/auth', (req, res) => {
    req.on('data', data => {
        const [username, password] = data.toString().split('&').map(field => field.split('=')[1])

        try {
            logic.authenticateUser(username, password)

            res.setHeader('set-cookie', `username=${username}`)

            res.redirect('/')
        } catch (error) {
            const loginError = fs.readFileSync('./login-error.html')

            res.setHeader('Content-Type', 'text/html')

            res.send(loginError)
        }
    })
})

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

server.post('/register', (req, res) => {
    req.on('data', data => {
        const [name, surname, email, username, password, repeatPassword] = data.toString().split('&').map(field => decodeURIComponent(field.split('=')[1]))

        try {
            logic.registerUser(name, surname, email, username, password, repeatPassword)

            res.redirect('/login')
        } catch (error) {
            res.redirect('/registerUser')
        }
    })
})

server.get('/registerUser', (req, res) => {
    const register = fs.readFileSync('./register.html', 'utf-8')

    res.setHeader('Content-Type', 'text/html')

    res.send(register)
})

server.get('/loginUser', (req, res) => {
    const login = fs.readFileSync('./login.html', 'utf-8')

    res.setHeader('Content-Type', 'text/html')

    res.send(login)
})

server.post('/logout', (req, res) => {
    res.clearCookie('username')

    res.redirect('/login')
})

server.listen(8080, () => console.info('server up'))