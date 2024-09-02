import logic from '../../logic'

import { useNavigate } from 'react-router-dom'

import Footer from '../home/Footer'
import Header from '../home/Header'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Input from '../library/Input'
import Label from '../library/Label'
import Link from '../library/Link'

import useContext from '../context'
import extractPayLoadFromToken from '../../util/extractPayLoadFromToken'
import { useEffect, useState } from 'react'

export default function Settings({ onLogoutClick }) {
    const { alert } = useContext()

    const { sub: userId } = extractPayLoadFromToken(sessionStorage.token)
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [])

    const handleUpdateSubmit = event => {
        event.preventDefault()

        const form = event.target

        const imageInput = form['image-input']
        const nameInput = form['name-input']
        const surnameInput = form['surname-input']

        const image = imageInput.value
        const name = nameInput.value
        const surname = surnameInput.value

        try {
            logic.updateUser(image, name, surname)
                .then(() => {
                    loadUser()

                    alert('Cambios guardados')

                    navigate('/')
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        onLogoutClick()
    }

    const loadUser = () => {
        try {
            logic.getUser(userId)
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        <Header />
        <main className='h-screen flex flex-col'>
            <Container className=' bg-teal-100 pt-8 pb-8 text-start'>
                <Heading className='text-center mb-6 pt-8 text-2xl font-bold '>Editar usuario</Heading>

                {user && <form onSubmit={handleUpdateSubmit} className='bg-white rounded-[50px] p-6 m-2 space-y-2'>
                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='image-input'>Imagen</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='image-input' type='text' name='image' defaultValue={user.image} placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='name-input'>Nombre</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='name-input' name='name' defaultValue={user.name} placeholder='nombre' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='surname-input'>Apellidos</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='surname-input' name='surname' defaultValue={user.surname} placeholder='apellidos' />
                    </Container>

                    <Container className='text-center pb-4 pt-0'>
                        <button className='w-36 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200' type='submit'>{'Guardar cambios'}</button>
                    </Container>

                </form>}

                <Container className='text-center pb-8 pt-2'>
                    <Link className='font-bold p-2 text-teal-700 hover:text-teal-900' onClick={handleLogoutClick}>Cerrar sesión</Link>
                </Container>
                <Footer defaultTab={'login'} />
            </Container>
        </main>
    </>
}