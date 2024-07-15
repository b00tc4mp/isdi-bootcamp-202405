import express from 'express'

const api = express()

import React from 'react'

import Register from '../app/view/Register.jsx'

api.get('/hello', (req, res) => {
    res.send('Hello, World!')
})

api.get('/app/register', (req, res) => {
    const html = React.renderToString(Register)

    req.send(html)
})

api.listen(8080, () => console.log('server up'))