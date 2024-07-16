const express = require('express')

const server = express()

server.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Web Server</title>

            <style>
                .form {
                    display: flex;
                    flex-direction: column;
                }
            </style>
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

server.listen(8080, () => console.info('server up'))