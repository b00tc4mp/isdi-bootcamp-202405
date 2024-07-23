import './Container.css';

const Container = ({ className = 'Container', children, onClick }) => {
    return <div className={className} onClick={onClick}>{children}</div>
}

export default Container