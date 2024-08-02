import extractPayloadFromToken from '../utils/extractPayloadFromToken.js'

export default () => {
    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    return userId
}