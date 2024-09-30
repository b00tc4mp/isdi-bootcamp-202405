export default function Button({ className = '', children, ...nextProps }) {
    return <button className={`h-9 rounded-[7px] text-[1.1rem] text-[#FFEBF4] ${className}`} {...nextProps}>{children}</button>
}