import extractPayloadFromToken from '../util/extractPayloadFromToken.js'

export default () => {
    const { sub: username } = extractPayloadFromToken(sessionStorage.token)

    return username
}