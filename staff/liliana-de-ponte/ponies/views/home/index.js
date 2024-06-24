(function () {
    const body = new Component(document.body)

    const header = new Header
    body.add(header)

    const main = new Main
    body.add(main)

    const footer = new Footer
    body.add(footer)

})()