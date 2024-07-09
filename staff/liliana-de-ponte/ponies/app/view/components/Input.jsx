function Input({ id, type, name, placeholder, defaultValue, className = '' }) {
    return <input className={`Input ${className}`} id={id} type={type} name={name} placeholder={placeholder} defaultValue={defaultValue} />

}

export default Input

