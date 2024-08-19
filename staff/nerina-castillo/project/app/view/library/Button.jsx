export default function Button({ children, className = '', ...nextProps }) {
    return <button className={`border px-2 rounded ${className}`} {...nextProps}>{children}</button>
}