function Input({ id, defaulValue }) {
    console.debug('Input -> call')

    return <input className="Input" id={id} defaultValue={defaulValue} />
}

export default Input