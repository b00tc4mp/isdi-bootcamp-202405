export default function Label({ htmlFor, children, className = '' }) {
    return <label className={className || 'text-slate-500'} htmlFor={htmlFor}>{children}</label>
}