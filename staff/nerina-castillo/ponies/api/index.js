import express from 'express'  //importamos el módulo express

const api = express()  //creamos una instancia de express y la guardamos en la constante api

api.get('/hello', (req, res) => {  //efinimos una ruta HTTP GET en '/hello'
   
    res.send('Hello, world')

     //req: request, contiene información sobre la solicitud HTTP
    //res: response, objeto de respuesta que se usa para enviar una respuesta al cliente
    
})

api.listen(8080, () => console.log('server up'))

//iniciamos el servidor para que escuche en el puerto 8080