export default token => {
    const payload64 = token.slice(token.indexOf('.') + 1, token.lastIndexOf('.'))

    const payloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    return payload
}