export default function Container({ children, className = '' }) {
    return <div className={`flex gap-2 ${className}`}>{children}</div>
}