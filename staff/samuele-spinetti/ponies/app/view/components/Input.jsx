function Input({ id, defaultValue, type, name, placeholder, value = '', onChange }) {
    return <input className="Input" id={id} defaultValue={defaultValue} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
}

export default Input