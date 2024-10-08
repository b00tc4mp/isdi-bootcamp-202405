export default function Image({ src, className, alt }) {
    return <img src={src} className={`rounded-lg ${className}`} alt={alt} />
}