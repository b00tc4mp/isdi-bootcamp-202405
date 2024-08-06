import './Button.css';

export default function Button({ type = 'button', className = '', onClick, children }) {
    return <button className={className || 'rounded-sm bg-slate-300 px-8 min-w-16 h-6 text-black'} type={type} onClick={onClick}>{children}</button>
}