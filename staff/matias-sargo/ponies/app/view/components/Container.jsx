function Container({ children, className = '' }) {
    console.debug('Container -> call');
  
    const containerBaseClasses = 'flex gap-2 px-2'; // Base container classes
  
    return <div className={`${containerBaseClasses} ${className}`}>{children}</div>;
  }
  
  export default Container;