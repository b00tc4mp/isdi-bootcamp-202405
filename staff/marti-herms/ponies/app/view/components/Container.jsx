import './Container.css';

export default function Container({ className = 'Container', children, onClick }) {
    return <div className={className} onClick={onClick}>{children}</div>
}