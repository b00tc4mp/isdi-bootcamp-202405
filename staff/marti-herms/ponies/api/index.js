import express from 'express'

const api = express()

// console.log(api)

api.get('/hello', (req, res) => {
    res.send('Hello, World!')
})

api.listen(8080, () => console.log('server listening on port 8080'))