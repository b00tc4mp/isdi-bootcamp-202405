import logic from '../logic'

import Heading from './components/Heading'
import Form from './components/Form'
import Label from './components/Label'
import Input from './components/Input'
import Container from './components/Container'
import Link from './components/Link'
import Button from './components/Button'

import { errors } from '../../com'

const { NotFoundError, CredentialsError } = errors

function Login({ onLogin, onRegisterClick }) {
    console.debug('Login -> call')

    const handleLoginSubmit = event => {
        console.debug('Login -> handleLoginSubmit')

        event.preventDefault()

        const form = event.target

        const usernameInput = form['username-input']
        const passwordInput = form['password-input']

        const username = usernameInput.value
        const password = passwordInput.value

        try {
            logic.loginUser(username, password)
                .then(() => onLogin())
                .catch(error => {
                    console.error(error)

                    let message = error.message

                    if (error instanceof NotFoundError || error instanceof CredentialsError)
                        message = 'incorrect username and/or password'

                    alert(message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = event => {
        console.debug('Login -> handleRegisterClick')

        event.preventDefault()

        onRegisterClick()
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <Heading level="1" className="text-2xl font-bold text-center mb-4">
              Login
            </Heading>
      
            <Form onSubmit={handleLoginSubmit} className="flex flex-col space-y-4">
              <Container className="flex flex-col">
                <Label htmlFor="username-input" className="text-gray-700">
                  Username
                </Label>
                <Input
                  type="text"
                  id="username-input"
                  name="username"
                  placeholder="Enter your username"
                  className="mt-1 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Container>
      
              <Container className="flex flex-col">
                <Label htmlFor="password-input" className="text-gray-700">
                  Password
                </Label>
                <Input
                  type="password"
                  id="password-input"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Container>
      
              <Button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </Button>
            </Form>
      
            <div className="mt-4 text-center">
              <Link onClick={handleRegisterClick} className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                Register
              </Link>
            </div>
          </div>
        </main>
      );
    }
export default Login