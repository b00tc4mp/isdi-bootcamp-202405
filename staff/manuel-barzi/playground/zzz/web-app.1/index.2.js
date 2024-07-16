const express = require('express')
const fs = require('fs')

const server = express()

server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')

    res.send(`<!DOCTYPE html>
<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Web Server</title>

            <link rel="stylesheet" href="index.css" />
        </head>

        <body>
            <h1>Web Server</h1>

            <h2>Login</h2>

            <form class="form">
                <input type="text" name="username">
                <input type="password" name="password">

                <button type="submit">Login</button>
                <button type="reset">Clear</button>
            </form>
        </body>
</html>`)
})

server.get('/index.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css')

    res.send(`.form {
    display: flex;
    flex-direction: column;
}`)
})


server.get('/favicon.ico', (req, res) => {
    const favicon = fs.readFileSync('./favicon.ico')

    res.setHeader('Content-Type', 'image/vnd.microsoft.icon')

    res.send(favicon)
})

server.listen(8080, () => console.info('server up'))