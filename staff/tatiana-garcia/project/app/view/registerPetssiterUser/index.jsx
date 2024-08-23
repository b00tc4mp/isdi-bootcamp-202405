import logic from '../../logic'

import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Link from '../library/Link'
import Footer from '../home/Footer'
import Heading from '../library/Heading'
import Header from '../home/Header'

import useContext from '../context'
import { useState } from 'react'

export default function RegisterPetsitterUser({ onRegisterPetsitterUser, onLoginClick }) {
    const { alert } = useContext()
    const [selectedPets, setSelectedPets] = useState([])

    const handleregisterPetsitterUserSubmit = event => {
        event.preventDefault()

        const form = event.target

        const imageInput = form['image-input']
        const nameInput = form['name-input']
        const cityInput = form['city-input']
        const descriptionInput = form['description-input']
        const emailInput = form['email-input']
        const phoneNumberInput = form['phoneNumber-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']

        const image = imageInput.value
        const name = nameInput.value
        const city = cityInput.value
        const description = descriptionInput.value
        const email = emailInput.value
        const phoneNumber = phoneNumberInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value
        const pets = selectedPets

        try {
            logic.registerPetsitterUser(image, name, city, description, email, phoneNumber, password, passwordRepeat, pets)
                .then(() => onRegisterPetsitterUser())
                .catch(error => {
                    console.error(error)

                    alert(message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePetChange = event => {
        const { value, checked } = event.target

        if (checked) {
            setSelectedPets([...selectedPets, value])
        } else {
            setSelectedPets(selectedPets.filter(pet => pet !== value))
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    return <>
        <Header />
        <main className='h-screen flex flex-col mb-32'>
            <Container className=' bg-teal-100 pt-8 pb-8 text-start'>
                <Heading className='text-center mb-6 pt-8 text-2xl font-bold '>Registro</Heading>

                <form onSubmit={handleregisterPetsitterUserSubmit} className='bg-white rounded-[50px] p-6 space-y-2'>
                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='image-input'>Imagen</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='image-input' type='text' placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='name-input'>Nombre</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='name-input' name='name' placeholder='nombre' />
                    </Container>

                    <Container >
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='city-input'>Ciudad</Label>
                        <select className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' name='city' id='city-input' required >
                            <option value=''>Seleccione una ciudad</option>
                            <option value='madrid'>Madrid</option>
                            <option value='barcelona'>Barcelona</option>
                            <option value='valencia'>Valencia</option>
                            <option value='sevilla'>Sevilla</option>
                            <option value='zaragoza'>Zaragoza</option>
                            <option value='malaga'>Málaga</option>
                            <option value='murcia'>Murcia</option>
                            <option value='palma'>Palma</option>
                            <option value='las_palmas'>Las Palmas de Gran Canaria</option>
                            <option value='bilbao'>Bilbao</option>
                            <option value='alicante'>Alicante</option>
                            <option value='cordoba'>Córdoba</option>
                            <option value='valladolid'>Valladolid</option>
                            <option value='vigo'>Vigo</option>
                            <option value='gijon'>Gijón</option>
                            <option value='l_hospitalet'>L'Hospitalet de Llobregat</option>
                            <option value='vitoria'>Vitoria-Gasteiz</option>
                            <option value='la_coruna'>La Coruña</option>
                            <option value='granada'>Granada</option>
                            <option value='elche'>Elche</option>
                            <option value='oviedo'>Oviedo</option>
                            <option value='badalona'>Badalona</option>
                            <option value='sabadell'>Sabadell</option>
                            <option value='cartagena'>Cartagena</option>
                            <option value='terrassa'>Terrassa</option>
                            <option value='jerez'>Jerez de la Frontera</option>
                            <option value='santander'>Santander</option>
                            <option value='almeria'>Almería</option>
                            <option value='burgos'>Burgos</option>
                            <option value='albacete'>Albacete</option>
                            <option value='san_sebastian'>San Sebastián</option>
                            <option value='salamanca'>Salamanca</option>
                            <option value='logrono'>Logroño</option>
                            <option value='lleida'>Lleida</option>
                            <option value='marbella'>Marbella</option>
                            <option value='cadiz'>Cádiz</option>
                            <option value='huelva'>Huelva</option>
                            <option value='tarragona'>Tarragona</option>
                            <option value='leon'>León</option>
                            <option value='jaen'>Jaén</option>
                            <option value='ourense'>Ourense</option>
                            <option value='algeciras'>Algeciras</option>
                            <option value='gerona'>Gerona</option>
                            <option value='lugo'>Lugo</option>
                        </select>
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='email-input'>Descripción</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' id='description-input' name='description' placeholder='descripción' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='description-input'>Email</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='email' id='email-input' name='email' placeholder='email' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='phoneNumber-input'>Teléfono</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='tel' id='phoneNumber-input' name='phoneNumber' placeholder='inserta tu teléfono' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='password-input'>Contraseña</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='password' name='password' id='password-input' placeholder='contraseña' />
                    </Container>

                    <Container className='pb-2'>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='password-repeat-input'>Repite contraseña</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='password' id='password-repeat-input' name='password-repeat' placeholder='repite contraseña' />
                    </Container>

                    <Container>
                        <label htmlFor='pets-input'>¿Qué animales cuidas?</label><br /><br />

                        <input
                            type='checkbox'
                            id='rabbits-input'
                            value='rabbits'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='rabbits-input'>Conejos</label><br />

                        <input
                            type='checkbox'
                            id='guinea-pig-input'
                            value='guineaPig'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='guinea-pig-input'>Cobayas</label><br />

                        <input
                            type='checkbox'
                            id='hamsters-input'
                            value='hamsters'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='hamsters-input'>Hamsters</label><br />

                        <input
                            type='checkbox'
                            id='rats-input'
                            value='rats'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='rats-input'>Rátas</label><br />

                        <input
                            type='checkbox'
                            id='birds-input'
                            value='birds'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='birds-input'>Aves</label><br />

                        <input
                            type='checkbox'
                            id='reptiles-input'
                            value='reptiles'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='reptiles-input'>Reptiles</label><br /><br />
                    </Container>

                    <Container className='text-center'>
                        <button className='w-32 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200' type='submit'>{'Regístrate'}</button>
                    </Container>
                </form>
                <Container className='text-center  pb-8 pt-2'>
                    <Link className='text-bold text-teal-600 hover:text-teal-900' onClick={handleLoginClick}>¿Ya tienes tu cuenta? Loguéate</Link>
                </Container>
                <Footer />
            </Container>
        </main>
    </>
}