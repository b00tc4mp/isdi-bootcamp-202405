export default function Label({ children, ...nextProps }) {
    console.debug('Label -> call')

    return <label className="text-[dimgray]" {...nextProps}>{children}</label>
}