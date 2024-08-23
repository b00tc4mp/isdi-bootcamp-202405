export default function Button({ children, className = '', ...nextProps }) {
    return <button className={`px-3 ${className}`} {...nextProps}>{children}</button>
}