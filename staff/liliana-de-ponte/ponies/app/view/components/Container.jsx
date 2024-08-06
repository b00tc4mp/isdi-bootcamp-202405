function Container({ children, className = '' }) {
    return <div className={`flex box-border gap-[0.5rem] p-[0.5rem] ${className}`}>{children}</div>
}

export default Container

// .Container {
//     display: flex;
//     box-sizing: border-box;
//     gap: .5rem;
//     padding: 0 .5rem;
// }


// .Container--left {
//     justify-content: left;
// }

/* .Container--center {
    justify-content: center;
} */

// .Container--column {
//     flex-direction: column;
// }

/* .Container--column-center {
    align-items: center;
} */

// .Container--column-left {
//     align-items: start;
// }

/* 
.Container--section-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;

} */



/* .Container {
    padding: 0 .5rem;
    display: flex;
    gap: .5rem;
    align-items: center;

} */


/* .Container--field {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0;
    gap: .2rem;
} */