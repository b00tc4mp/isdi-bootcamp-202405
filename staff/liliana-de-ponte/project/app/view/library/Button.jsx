export default function Button({ className = '', children, ...nextProps }) {
    return <button className={`h-22px rounded-[7px] bg-[#0509568] text-[1.1rem] text-[#FFEBF4] dark:text-[#050968] ${className}`} {...nextProps}>{children}</button>
}