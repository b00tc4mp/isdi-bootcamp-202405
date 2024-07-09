function Input({ id, defaultValue, type = 'text', name, placeholder }) {
    return <input className="Input" id={id} defaultValue={defaultValue} type={type} name={name} placeholder={placeholder} />
}

export default Input