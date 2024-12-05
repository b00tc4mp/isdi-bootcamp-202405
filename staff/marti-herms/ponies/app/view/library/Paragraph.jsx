export default function Paragraph({ className = "", children }) {
    return <p className={`m-2 ${className}`}>{children}</p>
}