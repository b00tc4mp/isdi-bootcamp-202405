import './Heading.css';

export default function Heading({ level = 1, children }) {
    const Tag = `h${level}`

    return <Tag className="Heading">{children}</Tag>
}