import './Form.css';

export default function Form({ onSubmit, children, className = '' }) {
    return <form className={`Form ${className}`} onSubmit={onSubmit}>{children}</form>
}