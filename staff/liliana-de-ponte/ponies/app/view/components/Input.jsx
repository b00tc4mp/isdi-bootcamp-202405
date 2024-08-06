function Input({ className = '', ...nextProps }) {
    return <input className={`border-[#F981FB] border-[1px] rounded-[.70rem] text-[inherit] w-full px-[.5rem] bg-[#FEE5FF] h-20px p-5px ${className}`} {...nextProps} />

}

export default Input

// .Input {
//     font-size: inherit;
//     background-color: #FEE5FF;
//     border-radius: 7px;
//     border-color: #F981FB;
//     box-shadow: #F981FB;
//     height: 20px;
//     padding: 5px;
// }

// .Input--full-width {
//     width: 95%;
// }