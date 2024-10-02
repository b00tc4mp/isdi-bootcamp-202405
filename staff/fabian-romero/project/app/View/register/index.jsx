import Heading from '../library/Heading'
import Link from '../library/Link'
import Button from '../library/Button'
import useContext from '../context'
import { useState } from 'react'
import Container from '../library/Container'
import Label from '../library/Label'

export default function Register({ onUserProjectClick, onUserInvestorClick, onLoginClick }) {
    console.debug('Register -> call')

    const { alert } = useContext()

    const [selectedOption, setSelectedOption] = useState('project')
    const handleSelectChange = event => {
        setSelectedOption(event.target.value)
    }

    const handleSubmit = event => {
        console.debug('Register -> handleSubmit')

        event.preventDefault()
        if (selectedOption === 'project') {
            onUserProjectClick()
        } else if (selectedOption === 'investor') {
            onUserInvestorClick()
        }
    }

    const handleLoginClick = event => {
        console.debug('Register -> handleLoginClick')

        event.preventDefault()

        onLoginClick()
    }

    return <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-cyan-950 via-gray-900 to-cyan-900 p-8 text-blue-300">
        {/* Título estilizado */}
        <Heading
            level="1"
            className="text-4xl font-bold tracking-wide text-transparent bg-clip-text text-orange-400 mb-8"
        >
            ⚡️Register⚡️
        </Heading>

        {/* Contenedor del selector */}
        <Container className="w-full max-w-sm">
            <Label
                htmlFor="role"
                className="block text-lg font-medium text-blue-400 mb-4"
            >
                Register as:
            </Label>
        </Container>

        {/* Selector estilizado */}
        <Container className="flex justify-center">
            <select
                id="role"
                value={selectedOption}
                onChange={handleSelectChange}
                className="block appearance-none w-full max-w-sm bg-transparent text-white border border-blue-500 rounded-full shadow-lg px-4 py-2 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
                <option value="project" className="text-gray-800">
                    Register Your Project
                </option>
                <option value="investor" className="text-gray-800">
                    Register as Investor
                </option>
            </select>
        </Container>

        {/* Botón de envío */}
        <Button
            onClick={handleSubmit}
            className="mt-4 px-6 py-3 bg-gradient-to-b from-cyan-800 via-gray-800 to-cyan-800 text-orange-400 rounded-full shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
        >
            Submit
        </Button>

        {/* Enlace de login */}
        <Link
            onClick={handleLoginClick}
            className="mt-4 text-sm text-orange-400 hover:text-teal-300 transition-colors"
        >
            Login
        </Link>
    </main>
}
