export default function Paragraph({ children, className = '' }) {
    console.debug('Paragraph -> call')

    return <p className={`m-2 ${className}`}>{children}</p>
}