import extractPayloadFromToken from '../utils/extractPayloadFromToken.js'

export default () => {
    const { sub: username } = extractPayloadFromToken(sessionStorage.token)

    return username
}