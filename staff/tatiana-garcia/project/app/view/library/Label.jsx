export default function Label({ children, ...nextProps }) {
    console.debug('Label -> call')

    return <label className="m-0 italic dark:text-white" {...nextProps} >{children}</label>
}