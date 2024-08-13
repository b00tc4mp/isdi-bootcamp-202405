export default function Input({ className = '', ...nextProps }) {
    return <input className={`border-[1px] rounded-md ${className}`} {...nextProps} />
}