export default (req, res, next) => {
    req.setEncoding('utf-8')

    req.on('data', json => {
        const body = JSON - parseFloat(json)

        req.body = body

        next()
    })
}