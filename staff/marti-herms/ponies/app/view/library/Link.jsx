export default function Link({ onClick, text }) {
    const handleClick = (event) => {
        event.preventDefault();

        try {
            onClick();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }

    }

    return <a href='' className='underline underline-offset-2' onClick={handleClick} >{text}</a>
}