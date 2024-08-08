export default function Paragraph({ children, className = '' }) {
    console.debug('paragraph -> call')

    return <p className={`m-2 ${className}`} >{children}</p>
}