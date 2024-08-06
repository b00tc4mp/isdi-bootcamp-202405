import './Button.css';

export default function Button({ type = 'button', className = 'Button', onClick, children }) {
    return <button className={className} type={type} onClick={onClick}>{children}</button>
}