import extractPayloadFromToken from '../util/extractPayloadFromToken.js'

export default () => {
    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    return userId
}
