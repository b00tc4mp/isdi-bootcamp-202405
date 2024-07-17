import express from 'express'  //importamos el módulo express

import logic from 'cor/logic/index.js'

const api = express()  //creamos una instancia de express y la guardamos en la constante api

api.get('/hello', (req, res) => {  //efinimos una ruta HTTP GET en '/hello'
   
    res.send('Hello, world')

     //req: request, contiene información sobre la solicitud HTTP
    //res: response, objeto de respuesta que se usa para enviar una respuesta al cliente
    
})

api.post('/users', (req, res) => {
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
// TODO POST /users/auth (authenticateUser)

 api.post('/users/auth', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
    const {username, password} = JSON.parse(json)



    try{
        logic.authenticateUser(username, password)

        res.setHeader('Authorization', `Basic ${username}`)


        res.status(200).send()
    } catch (error){
        res.status(500).json({error: error.constructor.name, message: error.message})
        }
    })
})

// TODO GET /users/:userId/name (getUserName) [Authorization: Basic username]
api.get('/users/:username/name', (req, res) => {
    req.setEncoding('utf-8')

    const { username } = req.params

    const { authorization } = req.headers

        try{
            const user = logic.getUser(username)

            if(!authorization || user.username !== authorization.split(' ')[1]) throw new Error('no authorization')

            const name = logic.getUserName(username)

            res.status(200).send(name)
        } catch(error){
            res.status(500).json({error: error.constructor.name, message: error.message})
        }
    })


// TODO GET /posts (getAllPosts) [Authorization: Basic username]

api.get('/posts', (req, res) => {
    req.setEncoding('utf-8')

    const { authorization } = req.headers

    const author = authorization.split(' ')[1]

    try{
        const user = logic.getUser(author)

        if(!authorization || user.username !== author) throw new Error('no authorization')
            
        const posts = logic.getAllPosts(user.username)

        res.status(200).json({posts})
    } catch(error) {
        res.status(500).json({error: error.constructor.name, message: error.message})
    }
})

// TODO GET /posts/ponies (getAllPoniesPosts) [Authorization: Basic username]

api.get('/posts/following', (req, res) => {
    req.setEncoding('utf-8')

    const { authorization } = req.headers

    const author = authorization.split(' ')[1]


    try{
        const user = logic.getUser(author)

         if(!authorization || user.username !== author) throw new Error('no authorization')

        const following = logic.getAllFollowingUserPosts(user.username)

        res.status(200).json({following})
    } catch(error){
        res.status(500).json({error: error.constructor.name, message: error.message})
    }
})

// TODO GET /posts/favs [Authorization: Basic username]
api.get('/posts/favs', (req, res) => {
    req.setEncoding('utf-8')

    const { authorization } = req.headers

    const author = authorization.split(' ')[1]


    try{
        const user = logic.getUser(author)

         if(!authorization || user.username !== author) throw new Error('no authorization')

        const favs = logic.getAllFavPosts(user.username)

        res.status(200).json({favs})
    } catch(error){
        res.status(500).json({error: error.constructor.name, message: error.message})
    }
})


// TODO POST /posts (createPost) [Authorization: Basic username]

api.post('/posts', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
    const { username, image, caption } = JSON.parse(json)

    const { authorization } = req.headers

    const author = authorization.split(' ')[1]

    try{
        const user = logic.getUser(author)

        if(!authorization || user.username !== author) throw new Error('no authorization')
            
        const post = logic.createPost(username, image, caption)

        res.status(201).json({post})
    } catch(error) {
        res.status(500).json({error: error.constructor.name, message: error.message})
    }
    })
})

// TODO DELETE /posts/:postId (deletePost) [Authorization: Basic username]

api.delete('/posts/:postId', (req, res) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
    const { postId } = JSON.parse(json)

    const { authorization } = req.headers

    const author = authorization.split(' ')[1]

    console.log(`postId: ${postId}, type: ${typeof postId}`);
    console.log(`authorization: ${authorization}`);

    try{
        const user = logic.getUser(author)

        if(!authorization || user.username !== authorization.split(' ')[1]) throw new Error('no authorization')

        console.log(`Attempting to delete post with postId: ${postId}`);
        logic.deletePost(postId)

        res.status(200).send()
    } catch(error){
        res.status(500).json({error: error.constructor.name, message: error.message})
    }
    })
})


// TODO PATCH /posts/:postId/likes (toggleLikePost) [Authorization: Basic username]


api.listen(8080, () => console.log('server up'))

//iniciamos el servidor para que escuche en el puerto 8080

