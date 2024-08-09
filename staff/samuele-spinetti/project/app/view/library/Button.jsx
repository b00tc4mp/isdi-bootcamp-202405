export default function Button({ children, ...nextProps }) {
    return <button {...nextProps}>{children}</button>
}