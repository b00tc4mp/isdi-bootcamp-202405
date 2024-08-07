export default function Label({ htmlFor, children }) {
    console.debug('Label -> call')

    return <label className="m-0 italic" htmlFor={htmlFor} >{children}</label>
}