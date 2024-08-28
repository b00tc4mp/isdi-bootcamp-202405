import { useEffect, useState } from 'react'

import logic from '../../logic'

import Footer from '../home/Footer'
import Header from '../home/Header'
import Container from '../library/Container'
import Heading from '../library/Heading'
import Input from '../library/Input'
import Label from '../library/Label'
import Link from '../library/Link'

import useContext from '../context'

export default function Settings({ onLogoutClick }) {
    const { alert } = useContext()

    const [formValues, setFormValues] = useState({
        image: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        passwordRepeat: ''

    })

    useEffect(() => {
        try {
            logic.getUser()
                .then(user => {
                    setFormValues({
                        image: user.image || '',
                        name: user.name || '',
                        surname: user.surname || '',
                        email: user.email || '',
                        password: user.password || '',
                        passwordRepeat: user.passwordRepeat || ''
                    })
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleUpdateSubmit = event => {
        event.preventDefault()

        const { userId, image, name, surname, email, password, passwordRepeat } = formValues

        if (password && password !== passwordRepeat) {
            alert('las contraseñas no coinciden')

            return
        }

        try {
            logic.updateUser({ userId, image, name, surname, email, password })
                .then(() => alert('Perfil actualizado correctamente'))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleInputChange = event => {
        const { name, value } = event.target

        setFormValues(preventValues => ({ ...preventValues, [name]: value }))
    }

    const handleLogoutClick = event => {
        event.preventDefault()

        onLogoutClick()
    }

    return <>
        <Header />
        <main className='h-screen flex flex-col mb-32'>
            <Container className=' bg-teal-100 pt-8 pb-8 text-start'>
                <Heading className='text-center mb-6 pt-8 text-2xl font-bold '>Editar usuario</Heading>

                <form onSubmit={handleUpdateSubmit} className='bg-white rounded-[50px] p-6 space-y-2'>
                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='image-input'>Imagen</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='image-input' type='text' name='image' value={formValues.image} onChange={handleInputChange} placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='name-input'>Nombre</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='name-input' name='name' value={formValues.name} onChange={handleInputChange} placeholder='nombre' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='surname-input'>Apellidos</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='surname-input' name='surname' value={formValues.surname} onChange={handleInputChange} placeholder='apellidos' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='email-input'>Email</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='email' id='email-input' name='email' value={formValues.email} onChange={handleInputChange} placeholder='email' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='password-input'>Nueva contraseña</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='password' name='password' id='password-input' value={formValues.password} onChange={handleInputChange} placeholder='contraseña' />
                    </Container>

                    <Container className='pb-2'>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='password-repeat-input'>Repite contraseña</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='password' id='password-repeat-input' name='password-repeat' value={formValues.passwordRepeat} onChange={handleInputChange} placeholder='repite contraseña' />
                    </Container>

                    <Container className='text-center pb-4 pt-0'>
                        <button className='w-36 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200' type='submit'>{'Guardar cambios'}</button>
                    </Container>

                </form>

                <Container className='text-center pb-8 pt-2'>
                    <Link className='text-bold text-teal-600 hover:text-teal-900' onClick={handleLogoutClick}>Cerrar sesión</Link>
                </Container>

                <Footer />
            </Container>
        </main>
    </>
}