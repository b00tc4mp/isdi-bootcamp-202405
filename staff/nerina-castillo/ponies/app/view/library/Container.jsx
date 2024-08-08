export default function Container({ children, className = '' }) {
    return <div className={`flex px-0 justify-around ${className}`}>
        {children}
    </div>
}
