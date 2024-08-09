export default function Label({ children, ...nextProps }) {
    return <label className="text-[dimgray] dark:text-white" {...nextProps}>{children}</label>
}