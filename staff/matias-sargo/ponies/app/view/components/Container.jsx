import './Container.css'
function Container({ children, className = '' }) {
    console.debug('Container -> call')

    return <div className={`Container ${className}`}>{children}</div>
}

export default Container