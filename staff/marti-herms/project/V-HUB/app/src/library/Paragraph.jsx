export default function Paragraph({ children, className = '' }) {
    return <p className={`m-2 dark:text-white ${className}`}>{children}</p>
}