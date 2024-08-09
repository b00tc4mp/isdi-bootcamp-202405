export default function Input({ className = '', type = 'text', required = false, ...nextProps }) {
    return <input className={`${className} py-1 px-1 rounded shadow shadow-slate-400 text-lg`} type={type} required={required} {...nextProps} />
}