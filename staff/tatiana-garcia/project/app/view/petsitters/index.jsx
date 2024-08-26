import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useContext from '../context.js'
import logic from '../../logic/index.js'

import Header from '../home/Header.jsx'
import Heading from '../library/Heading.jsx'
import Paragraph from '../library/Paragraph.jsx'
import Container from '../library/Container.jsx'
import Footer from '../home/Footer.jsx'

export default function SearchPetsitters() {
    const { alert } = useContext()
    const [city, setCity] = useState('')
    const [pet, setPet] = useState('')
    const [petsitters, setPetsitters] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (city) {
            try {
                logic.searchPetsitters(city, pet)
                    .then(petsitters => setPetsitters(petsitters))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        } else if (pet != '') {
            alert("Selecciona una ciudad para poder filtrar por mascota")
        } else {
            loadPetsitters()
        }
    }, [city, pet])

    const loadPetsitters = () => {
        try {
            logic.getAllPetsitters()
                .then(petsitters => setPetsitters(petsitters))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const onPetsitterDetailsClick = (petsitterId) => { navigate(`/petsitters/${petsitterId}`) }

    return <>
        <Header />
        <main className='bg-teal-100 h-screen mt-16 mb-12 flex flex-col items-center justify-start gap-4 text-[1.5rem]'>
            <Container className='p-2 bg-teal-100 w-full max-w-sm'>
                <Heading className='text-center mb-4 font-bold'>Guarderías</Heading>

                <Container className='text-lg p-0 rounded-[50px] text-center flex-col'>
                    <Container className='mb-2'>
                        <select className='mt-1 p-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='city-select' value={city} onChange={(e) => setCity(e.target.value)}>
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

                    <Container className='mb-4'>
                        <select className='mt-1 p-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500' id='pet-select' value={pet} onChange={(e) => setPet(e.target.value)} >
                            <option value=''>Seleccione un animal</option>
                            <option value='rabbits'>Conejos</option>
                            <option value='guineaPig'>Cobayas</option>
                            <option value='hamsters'>Hamsters</option>
                            <option value='rats'>Ratas</option>
                            <option value='birds'>Aves</option>
                            <option value='reptiles'>Reptiles</option>
                        </select>
                    </Container>
                </Container>
                <Container className='mt-4'>
                    {petsitters.length > 0 ? (
                        petsitters.map(petsitter => (
                            <div key={petsitter.id} className='flex items-start h-28 w-full mr-4 mb-4 rounded-[15px] shadow-md bg-white' onClick={() => onPetsitterDetailsClick(petsitter.id)}>
                                <img src={petsitter.image} alt={petsitter.name} className='h-24 w-24 rounded-[15px] mr-4 p-2' />
                                <div className='flex flex-col'>
                                    <Heading className='text-base font-bold'>{petsitter.name}</Heading>
                                    <Paragraph className='text-sm mt-1 ml-0 font-semibold text-gray-500'>{petsitter.city}</Paragraph>
                                    <Paragraph className='text-sm mt-0 ml-0 text-gray-700 overflow-hidden text-ellipsis' >{petsitter.description.substring(0, 40)}</Paragraph>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center justify-center items-center flex flex-col'>
                            <Paragraph className=' text-gray-500'>No hay guarderías disponibles para la selección actual.</Paragraph>
                        </div>
                    )}
                </Container>

                <Footer defaultTab={'petsitters'} />
            </Container>
        </main>
    </>
}