export default function Container({ children, className = '' }) {
    return <div className={`flex box-border  ${className}`}>{children}</div>
}