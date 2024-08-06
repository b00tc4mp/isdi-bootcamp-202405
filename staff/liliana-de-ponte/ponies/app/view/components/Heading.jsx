export default function Heading({ level = 1, children }) {
    const Tag = `h${level}`

    return <Tag className="m-0 color-[f981fb] text-[30px] mt-[55px]"> {children}</Tag >

}

// .Heading {
//     color: #F981FB;
//     font-size: 30px;
//     margin-top: 55px;
// }

// .Heading--create-post {
//     display: flex;
//     margin: .5rem 0;
//     justify-content: center;
// }

// .Heading--post {
//     font-weight: bold;
//     font-family: solid Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
//     font-size: 18px
// }