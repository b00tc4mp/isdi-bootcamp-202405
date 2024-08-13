//  Fixed
function Link({ href, onClick, children }) {
    console.debug('Link -> call')

    return <a href="#" onClick={onClick}>{children}</a>
}

export default Link