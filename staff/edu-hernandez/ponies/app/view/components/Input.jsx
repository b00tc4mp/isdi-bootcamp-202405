import './Input.css'

// Added className options -> className={`Input ${className}`}
function Input({ id, defaulValue, type, name, placeholder, className= '' }) {
    console.debug('Input -> call')

    return <input className={`Input ${className}`} id={id} defaultValue={defaulValue} type={type} name={name} placeholder={placeholder} />
}

export default Input