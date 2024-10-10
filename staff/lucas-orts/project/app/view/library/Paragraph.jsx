export default function Paragraph({ children, className = '' }) {
    return <p className={`m-0 ${className}`}>{children}</p>
}