import './Image.css';

export default function Image({ src, alt, title, className = 'Image' }) {
    return <img className={className} src={src} alt={alt} title={title} />
}