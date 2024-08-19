export default function Button({ className = '', children, ...nextProps }) {
    return <button className={className} {...nextProps}>{children}</button>
}