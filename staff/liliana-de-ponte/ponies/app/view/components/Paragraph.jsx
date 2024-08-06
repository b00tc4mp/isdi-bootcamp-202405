function Paragraph({ children, className = '' }) {
    return <p className={`m-2 ${className}`}>{children}</p>

}

export default Paragraph

// .Paragraph {
//     margin: .5rem;
// }


// .Paragraph--user-name {
//     margin: 0;
//     font-family: solid Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
//     font-weight: bold;
//     color: black;
// }

