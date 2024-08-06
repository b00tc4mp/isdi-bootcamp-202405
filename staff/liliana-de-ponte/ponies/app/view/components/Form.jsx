function Form({ onSubmit, children, className = '' }) {
    return <form className={`flex gap-[0.5rem]∫ box-border p-[ 0 .5rem .5rem .5rem] ${className}`} onSubmit={onSubmit}>{children}</form>
}

export default Form

// .Form {
//     padding: 0 .5rem .5rem .5rem;
//     display: flex;
//     gap: .5rem;
//     box-sizing: border-box;
// }

//     .Form--column {
//     flex - direction: column;
//     gap: .9rem;
//     min - width: 80 %;
//     margin - top: 40px;
// }

