import express from 'express'

import logic from 'cor/logic/index.js'

const api = express ()

api.get('/hello', (req, res) => {
    res.send('Hello, World!')
})

api.post('/users', (req, res)=> {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const { name, surname, email, username, password, passwordRepeat } = JSON.parse(json)

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)

            res.status(201).send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })

})

api.post('/users/auth',(req,res)=> {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const {  username, password } = JSON.parse(json)

        try {
            logic.authenticateUser(username, password)

            res.setHeader('Authorization', `Basic ${username}`)

            res.status(200).send()
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })

})


api.get('/users/:username/name',(req,res)=> { //:ruta dinamica
    req.setEncoding('utf-8')

    const {username}= req.params

    const {authorization }= req.headers

        try {
            const user = logic.getUser(username)

            if(!authorization || user.username !== authorization.split(' ')[1]) throw new Error('no authorization')

            const name = logic.getUserName(username)

            res.status(200).send(name)
        } catch (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })
        }
    })


    api.get('/posts',(req,res)=> {  
        req.setEncoding('utf-8') 

        const { authorization }= req.headers

        const author= authorization.split(' ')[1] 
    
            try {
                const user = logic.getUser(author)
    
                if(!authorization || user.username !== author) throw new Error('no authorization')
    
               const posts=  logic.getAllPosts(user.username)
    
                res.status(200).json({posts})
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })



// TODO 
 
api.listen(8080, () => console.log('API is up'))