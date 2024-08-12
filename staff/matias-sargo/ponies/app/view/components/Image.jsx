function Image({ src, alt, title, className = 'rounded shadow-md object-cover' }) {
    console.debug('Image -> call');
  
    return <img className={className} src={src} alt={alt} title={title} />;
  }
  
  export default Image;