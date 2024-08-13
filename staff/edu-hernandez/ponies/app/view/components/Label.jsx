import './Label.css'

function Label({ htmlFor, children }) {
    console.debug('Label -> call')

    return <label className="Label" htmlFor={htmlFor}>{children}</label>
}

export default Label