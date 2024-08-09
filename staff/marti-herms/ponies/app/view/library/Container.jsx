export default function Container({ className = '', children, onClick }) {
    return <div className={className + ' flex gap-2 items-start px-2'} onClick={onClick}>{children}</div>
}