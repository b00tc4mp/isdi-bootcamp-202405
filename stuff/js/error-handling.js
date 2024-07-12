function logic() {
    // ...
    //throw new TypeError('data is not number')
    throw new SyntaxError('data format is wrong')
    // ...
}

try {
    logic()
} catch (error) {
    if (error instanceof TypeError)
        alert('WARN! type is not correct')
    else if (error instanceof SyntaxError)
        alert('FATAL! syntax is not correct')

}