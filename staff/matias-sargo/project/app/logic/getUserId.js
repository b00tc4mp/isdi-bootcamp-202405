import extractPayloadFromToken from '../util/extractPayloadFromToken'

export default () => {
    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    return userId
}