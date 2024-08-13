import './Link.css'

//  Fixed
function Link({ href, onClick, children, className= '' }) {
    console.debug('Link -> call')

    return <a href="#" onClick={onClick} className={`Link${className}`}>{children}</a>
}

export default Link