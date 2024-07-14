import express from 'express'
import findUser from './data/findUser.js'

const app = express()

app.use(express.json())

app.get('/users/:username', (req, res) => {
    const username = req.params.username

    try{
        const user = findUser(user => user.username === username)
        if(!user){
            return res.status(404).send('user not found')
        }
        res.json(user)
    } catch(error){
        res.status(500).send(error.message)
    }
})

app.listen(8080, () => console.log('server running at http://localhost:8080/users/{username}'))


