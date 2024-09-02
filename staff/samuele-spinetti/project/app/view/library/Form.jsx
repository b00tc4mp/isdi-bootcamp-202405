export default function Form({ children, ...nextProps }) {
    return <form {...nextProps}>{children}</form>
}