const { Component } = React;

function Link({ href }) {
    const handleClick = (event) => {
        event.preventDefault();

        try {
            location.href = '../' + href.toLowerCase();
        } catch (error) {
            console.error(error);

            alert(error.message);
        }

    }

    return <a href='' onClick={handleClick} >{href}</a>
}

export default Link