export default function Input({ className = '', ...nextProps }) {
    return <input className={`border-[1px] w-137px h-24px ${className}`} {...nextProps} />
}