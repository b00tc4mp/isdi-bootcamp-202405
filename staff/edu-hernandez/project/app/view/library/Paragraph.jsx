export default function Paragraph({ children, className = '' }) {
    // console.debug('Paragraph -> call')

    return <p className={`${className}`}>{children}</p>
}