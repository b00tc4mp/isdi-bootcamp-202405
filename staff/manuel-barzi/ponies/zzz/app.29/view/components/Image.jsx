function Image({ src, alt, title }) {
    console.debug('Image -> call')

    return <img className="Image" src={src} alt={alt} title={title} />
}

export default Image