import './Image.css'

function Image({ className = 'Image', ...nextProps }) {
    console.debug('Image -> call')

    return <img className={className} {...nextProps} />
}

export default Image