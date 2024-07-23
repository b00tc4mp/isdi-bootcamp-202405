import './Heading.css'

function Heading({ level = 1, children, className = '' }) {
    const Tag = `h${level}`

    return <Tag className={`Heading ${className}`}> {children}</Tag >

}

export default Heading