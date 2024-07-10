import './Input.css'

function Input({ id, defaultValue, type, name, placeholder, className = '' }) {
    console.debug('Input -> call')

    return <input className={`Input ${className}`} id={id} defaultValue={defaultValue} type={type} name={name} placeholder={placeholder} />
}

export default Input