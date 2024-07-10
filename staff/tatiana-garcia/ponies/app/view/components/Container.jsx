import './Container.css'

function Container({ children, className = '' }) {
    return <div className={`form__field ${className}`}>{children}</div>

}

export default Container