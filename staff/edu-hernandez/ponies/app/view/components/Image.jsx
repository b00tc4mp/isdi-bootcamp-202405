import './Image.css'

function Image({ src, alt, title, className='Image' }) {
    console.debug('Image -> call')

    return <img className={className} src={src} alt={alt} title={title}></img>
}

export default Image