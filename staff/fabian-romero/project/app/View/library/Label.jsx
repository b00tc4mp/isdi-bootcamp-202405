export default function Label({ children, ...nextProps }) {
    console.debug('Label -> call')

    return <label className="text-[dimgray] dark:text-white" {...nextProps}>{children}</label>
}