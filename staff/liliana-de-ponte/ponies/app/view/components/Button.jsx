export default function Button({ className = "", children, ...nextProps }) {
    return <button className={`h-35px font-serif rounded-[5px] bg-[#F981FB] text-[1.1rem] ${className}`} {...nextProps}>{children}</button>
}
