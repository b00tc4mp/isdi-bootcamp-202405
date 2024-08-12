function Form({ onSubmit, children, className = '' }) {
    console.debug('Form -> call');
  
    const formBaseClasses = 'max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg'; // Example base classes for a form
  
    return <form className={`${formBaseClasses} ${className}`} onSubmit={onSubmit}>{children}</form>;
  }
  
  export default Form;