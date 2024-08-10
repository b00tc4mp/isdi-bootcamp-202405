export default function Container({ children, className = '' }) {
    return <div className={`flex box-border gap-[0.5rem] p-[0.5rem] ${className}`}>{children}</div>
}


