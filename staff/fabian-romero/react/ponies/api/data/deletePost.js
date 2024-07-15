import fs from 'fs' // importo esto para saber la forma en que se tienen que leer los codigos

function deletePost(condition) {
    let json = fs.readFileSync('./data/posts.json', 'utf8') // ya no uso localstorage, uso disco y esta es la manera apra poder que se lea la info que tengo almacenada en el disco

    const posts = json ? JSON.parse(json) : [] //si en el json hay algo, lo parsee, y si no.. que me devuelva un array vacio

    const postIndex = posts.findIndex(condition)

    if (postIndex > -1) {
        posts.splice(postIndex, 1)

        json = JSON.stringify(posts) // local no más ahora json
        fs.writeFileSync('./data/posts.json', json)
    }
}

export default deletePost
// esta carpeta datos de api es solo para manejar datos no sesiones

// cambiar a los validation