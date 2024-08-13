import './Paragraph.css'

function Paragraph({ children, className = '' }) {
    console.debug('Paragraph -> call')
    
    return <p className={`Paragraph ${className}`}>{children}</p>
}

export default Paragraph