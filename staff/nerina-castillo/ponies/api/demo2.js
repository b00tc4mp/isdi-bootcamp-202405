import express from 'express'
import findPost from './data/findPost.js'

const app = express()  //es la instancia de express que se usará para definir rutas y middleware

app.get('/posts/:postId', (req, res) => {  //se define una ruta GET en el endpoint '/posts/:postId
    const postId = req.params.postId  //extrae el valor del parámetro de la URL 'postId'

    try{
        const post = findPost(post => post.id === postId)
        if(!post){
           return res.status(404).send('post not found')
        }
        res.json(post)
    } catch(error){
        res.status(500).send(error.message)
    }
})

app.listen(8080, () => console.log('server running at http://localhost:8080/posts/{postId}'))  //el sevidor comienza a esuchar en el puerto 8080