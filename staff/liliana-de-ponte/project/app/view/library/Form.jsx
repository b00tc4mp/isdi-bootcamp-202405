export default function Form({ onSubmit, children, className = '' }) {
    return <form className={`flex gap-2 box-border ${className}`} onSubmit={onSubmit}>{children}</form>
}