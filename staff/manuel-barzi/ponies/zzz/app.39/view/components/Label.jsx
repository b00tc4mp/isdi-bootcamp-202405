import './Label.css'

function Label({ children, ...nextProps }) {
    console.debug('Label -> call')

    return <label className="Label" {...nextProps}>{children}</label>
}

export default Label