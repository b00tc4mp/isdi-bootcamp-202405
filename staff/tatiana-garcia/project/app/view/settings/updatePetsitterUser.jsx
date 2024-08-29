import logic from '../../logic'
import { useNavigate } from 'react-router-dom'

import Container from '../library/Container'
import Label from '../library/Label'
import Input from '../library/Input'
import Link from '../library/Link'
import Footer from '../home/Footer'
import Heading from '../library/Heading'
import Header from '../home/Header'

import useContext from '../context'
import extractPayLoadFromToken from '../../util/extractPayLoadFromToken'
import { useEffect, useState } from 'react'

export default function SettingsPetsitter({ onLogoutClick }) {
    const { alert } = useContext()

    const { sub: userId } = extractPayLoadFromToken(sessionStorage.token)
    const [selectedPets, setSelectedPets] = useState([])
    const [petsitter, setPetsitter] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        loadPetsitterUser()
    }, [])

    const handleUpdatePetsitterUserSubmit = event => {
        event.preventDefault()

        const form = event.target

        const imageInput = form['image-input']
        const nameInput = form['name-input']
        const cityInput = form['city-input']
        const descriptionInput = form['description-input']
        const linkPageInput = form['link-page.input']
        const contactEmailInput = form['contact-email-input']
        const phoneNumberInput = form['phone-number-input']

        const image = imageInput.value
        const name = nameInput.value
        const city = cityInput.value
        const description = descriptionInput.value
        const linkPage = linkPageInput.value
        const contactEmail = contactEmailInput.value
        const phoneNumber = phoneNumberInput.value
        const pets = selectedPets

        try {
            logic.updatePetsitterUser(image, name, city, description, linkPage, contactEmail, phoneNumber, pets)
                .then(() => {
                    loadPetsitterUser()

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

    const handlePetChange = event => {
        const { value, checked } = event.target

        if (checked) {
            setSelectedPets([...selectedPets, value])
        } else {
            setSelectedPets(selectedPets.filter(pet => pet !== value))
        }
    }


    const handleLogoutClick = event => {
        event.preventDefault()

        onLogoutClick()
    }

    const loadPetsitterUser = () => {
        try {
            logic.getUser(userId)
                .then(petsitter => setUser(petsitter))
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
        <main className='h-screen flex flex-col mb-32'>
            <Container className=' bg-teal-100 pt-8 pb-8 text-start'>
                <Heading className='text-center mb-6 pt-8 text-2xl font-bold '>Editar usuario</Heading>

                {petsitter && <form onSubmit={handleUpdatePetsitterUserSubmit} className='bg-white rounded-[50px] p-6 space-y-2'>
                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='image-input'>Imagen</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='image-input' type='text' defaultValue={petsitter.image} placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='name-input'>Nombre</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' defaultValue={petsitter.name} id='name-input' name='name' placeholder='nombre' />
                    </Container>

                    <Container >
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='city-input'>Ciudad</Label>
                        <select className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' defaultValue={petsitter.city} name='city' id='city-input'>
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
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='text' defaultValue={petsitter.description} id='description-input' name='description' placeholder='descripción' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='link-page-input'>Página web</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='link-page-input' type='text' defaultValue={petsitter.linkPage} placeholder='https://' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='description-input'>Email de contacto</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='email' defaultValue={petsitter.contactEmail} id='contact-email-input' name='contactEmail' placeholder='email' />
                    </Container>

                    <Container>
                        <Label className='block text-base font-semibold text-gray-700' htmlFor='phoneNumber-input'>Teléfono</Label>
                        <Input className='w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' type='tel' defaultValue={petsitter.phoneNumber} id='phone-number-input' name='phoneNumber' placeholder='inserta tu teléfono' />
                    </Container>

                    <Container>
                        <label htmlFor='pets-input'>¿Qué animales cuidas?</label><br /><br />

                        <input
                            type='checkbox'
                            defaultValue={petsitter.pets}
                            id='rabbits-input'
                            value='rabbits'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='rabbits-input'>Conejos</label><br />

                        <input
                            type='checkbox'
                            defaultValue={petsitter.pets}
                            id='guinea-pig-input'
                            value='guineaPig'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='guinea-pig-input'>Cobayas</label><br />

                        <input
                            type='checkbox'
                            defaultValue={petsitter.pets}
                            id='hamsters-input'
                            value='hamsters'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='hamsters-input'>Hamsters</label><br />

                        <input
                            type='checkbox'
                            defaultValue={petsitter.pets}
                            id='rats-input'
                            value='rats'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='rats-input'>Ratas</label><br />

                        <input
                            type='checkbox'
                            defaultValue={petsitter.pets}
                            id='birds-input'
                            value='birds'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='birds-input'>Aves</label><br />

                        <input
                            type='checkbox'
                            defaultValue={petsitter.pets}
                            id='reptiles-input'
                            value='reptiles'
                            name='pets-input'
                            onChange={handlePetChange}
                        />
                        <label htmlFor='reptiles-input'>Reptiles</label><br /><br />
                    </Container>

                    <Container className='text-center'>
                        <button className='w-32 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200' type='submit'>{'Guardar cambios'}</button>
                    </Container>
                </form>}
                <Container className='text-center  pb-8 pt-2'>
                    <Link className='font-bold p-2 text-teal-700 hover:text-teal-900' onClick={handleLogoutClick}>Cerrar sesión</Link>
                </Container>
                <Footer defaultTab={'login'} />
            </Container>
        </main>
    </>
}