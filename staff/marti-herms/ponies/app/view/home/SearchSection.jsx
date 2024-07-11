import Heading from '../components/Heading';
import Container from '../components/Container';
import Form from '../components/Form';
import Button from '../components/Button';

import './SearchSection.css';

function SearchSection({ onSearch, onCancel }) {
    const handleSearchUser = (event) => {
        event.preventDefault();

        const form = event.target

        const searchUserInput = form['post-caption-input']

        const username = searchUserInput.value;

        try {
            onSearch(username);
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    const handleCancel = (event) => {
        event.stopPropagation();

        if (event.target.className === 'Container--fader')
            onCancel();
    }

    const handleCancelButton = () => {
        onCancel();
    }

    return <Container className="Container--fader" onClick={handleCancel}>
        <section className="Usersearch">
            <Heading level="2" >Search User</Heading>
            <Form onSubmit={handleSearchUser}>
                <Container className="Container--field">
                    <input id="post-caption-input" type="text" placeholder=" " required />
                    <label htmlFor="post-caption-input">Username</label>
                </Container>
                <Container className="Container--actions">
                    <Button type="submit">Search</Button>
                    <Button onClick={handleCancelButton}>Cancel</Button>
                </Container>
            </Form>
        </section>
    </Container>
}

export default SearchSection;