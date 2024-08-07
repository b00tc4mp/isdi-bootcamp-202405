export default function Container({ children, className = '' }) {
    console.debug('container -> call')

    return <div className={`${className}`}>{children}</div>

}