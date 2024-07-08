import Link from '../components/Link';
import Heading from '../components/Heading'
import Form from '../components/Form'
import Container from '../components/Container'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'

import logic from '../../logic/index.mjs';

function Login({ }) {
    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        const usernameInput = form['username-input'];
        const passwordInput = form['password-input'];

        const username = usernameInput.value;
        const password = passwordInput.value;

        try {
            logic.loginUser(username, password);

            location.href = '../home';
        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return <main className='view'>
        <Heading level="1">Login</Heading>

        <Form className="Form--column" onSubmit={handleLoginSubmit}>
            <Container>
                <Label htmlFor='username-input'>Username:</Label>
                <Input id='username-input' type='text' placeholder='username' />
            </Container>

            <Container>
                <Label htmlFor='password-input'>Password:</Label>
                <Input id='password-input' type='password' placeholder='password' />
            </Container>

            <Button className='Button--login' type='submit'>Login</Button>
        </Form>

        <Link href="Register" />
    </main>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Login />);