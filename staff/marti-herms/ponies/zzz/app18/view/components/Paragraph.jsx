import './Paragraph.css';

export default function Paragraph({ className = "", children }) {
    return <p className={`Paragraph ${className}`}>{children}</p>
}