import extractPayLoadFromToken from '../util/extractPayloadFromToken.js'

export default () => {
    return new Promise((resolve, reject) => {
        try {
            const { role } = extractPayLoadFromToken(sessionStorage.token)
            resolve(role)
        } catch (error) {
            reject(error)
        }
    })
}



