export default function Input({ className = '', ...nextProps }) {
    return <input className={`border-[lightgray] border-[1px] rounded-[.25rem] text-black w-full px-[.5rem] ${className}`} {...nextProps} />
}