export default function Paragraph({ children, className = '' }) {
    return <p className={`break-words max-w-full whitespace-normal ${className}`}>{children}</p>
}