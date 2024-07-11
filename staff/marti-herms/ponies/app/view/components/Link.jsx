function Link({ onClick, text }) {
    const handleClick = (event) => {
        event.preventDefault();

        try {
            onClick();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }

    }

    return <a href='' onClick={handleClick} >{text}</a>
}

export default Link