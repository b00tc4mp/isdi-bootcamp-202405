export default function Form({ className, children, onSubmit }) {
    return <form className={className} onSubmit={onSubmit}>{children}</form>
}