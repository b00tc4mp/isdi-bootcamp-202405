export default function Form({ onSubmit, children, className = '' }) {
    return <form className={`flex gap-2 box-border p-[ 0 .5rem .5rem .5rem] ${className}`} onSubmit={onSubmit}>{children}</form>
}
