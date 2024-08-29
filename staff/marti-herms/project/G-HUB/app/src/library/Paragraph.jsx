export default function Paragraph({ children, className = '' }) {
    return <p className={`${className} m-2 dark:text-white`}>{children}</p>
}