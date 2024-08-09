import extractPayloadFromToken from '../util/extractPayloadFromToken'

export default () => {
    const { sub: username } = extractPayloadFromToken(sessionStorage.token)

    return username
}