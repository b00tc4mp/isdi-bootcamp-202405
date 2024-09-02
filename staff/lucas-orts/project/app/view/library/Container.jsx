export default function Container({ children, className = '' }) {
    return <div className={`flex gap-2 p-[0_.5rem] ${className}`}>{children}</div>
}