import express from 'express'

import Register from './view/Register.jsx'

const app = express()

//Routing  -- metodo y camino  --- solicitud y respuesta req y res
app.get('./view/Register', (req, res) => {
    res.send(Register)
})

//si ya esta definido el puerto process.env.PORT

const PUERTO =  process.env.PORT || 8080

app.listen(PUERTO, () => console.log('Está funcionando'))