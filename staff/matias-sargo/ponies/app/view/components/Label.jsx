function Label({ htmlFor, children, className = '' }) {
    console.debug('Label -> call');
  
    // Base label classes
    const labelBaseClasses = 'block text-sm font-medium text-gray-700';
  
    return (
      <label className={`${labelBaseClasses} ${className}`} htmlFor={htmlFor}>
        {children}
      </label>
    );
  }
  
  export default Label;