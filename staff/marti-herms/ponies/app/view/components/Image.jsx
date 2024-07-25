import './Image.css';

const Image = ({ src, alt, title, className = 'Image' }) => {
    return <img className={className} src={src} alt={alt} title={title} />
}

export default Image