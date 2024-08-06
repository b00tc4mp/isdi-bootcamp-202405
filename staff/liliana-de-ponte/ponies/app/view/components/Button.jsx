function Button({ className = "", children, ...nextProps }) {
    return <button className={`h-35px font-serif  font-bold rounded-[5px] bg-[#F981FB] text-[1.1rem] ${className}`} {...nextProps}>{children}</button>
}

export default Button

// .Button {
//     font-size: 1.1rem;
//     background-color: #F981FB;
//     /* border-color: transparent; */
//     border-radius: 5px;
//     /* border-width: 1px; */
//     /* border-style: solid; */
//     /* padding: 0; */
//     font-weight: bold;
//     height: 35px;
//     font-family: solid Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
// }



// .Button:hover {
//     border-color: lightgray;
//     background-color: #f7bff8
// }

// .Button--active {
//     border-color: lightgray
// }


// .Button--form {
//     /* button login*/
//     font-size: inherit;
//     background-color: #F981FB;
//     border-radius: 5px;
//     font-weight: bold;
//     height: 35px;
//     width: 90%;
// }

// .Button--header {
//     background-color: white;
//     font-weight: bold;
//     font-family: solid Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
//     height: 30px;
//     border-radius: 8px;
//     border-color: #f7bff8;
// }

// .Button--post {
//     background-color: white;
//     border-radius: 8px;
//     height: 30px;
//     border-color: #F981FB;
//     font-weight: bold;
//     font-family: solid Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
// }