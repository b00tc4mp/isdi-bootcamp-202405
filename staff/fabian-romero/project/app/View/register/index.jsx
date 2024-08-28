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

    return <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-cyan-50 to-cyan-200 text-gray-800 p-8">
        <Heading
            level="1"
            className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 mb-8"
        >
            ⚡️ Register ⚡️
        </Heading>

        <Container className="w-full max-w-xs">
            <Label
                htmlFor="role"
                className="block text-sm font-medium text-gray-600 mb-2"
            >
                Register as:
            </Label>
        </Container>

        <Container className="flex justify-center">
            <select
                id="role"
                value={selectedOption}
                onChange={handleSelectChange}
                className="block appearance-none w-full max-w-xs bg-cyan-100 text-gray-800 border border-cyan-300 rounded-full shadow-lg px-4 py-2 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
                <option value="project">Register Your Project</option>
                <option value="investor">Register as Investor</option>
            </select>
        </Container>

        <Button
            onClick={handleSubmit}
            className="mt-3 px-2 py-1 bg-cyan-300 text-gray-800 text-sm border border-transparent rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-cyan-400 hover:text-yellow-500"
        >
            Submit
        </Button>

        <Link
            onClick={handleLoginClick}
            className="mt-3 text-xs text-cyan-600 hover:text-yellow-500 transition-colors"
        >
            Login
        </Link>
    </main>
}    