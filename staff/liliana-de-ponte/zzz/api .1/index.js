import express from 'express'

const api = express ()

api.get('/hello', (req, res) => {
    res.send('Hello, World!')
})

api.listen(8080, () => console.log('server up'))