import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useContext from '../context'

import logic from '../../logic/index.js'

import Container from '../library/Container'
import Header from '../home/Header'
import Footer from '../home/Footer'
import Link from '../library/Link.jsx'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button.jsx'

export default function PetsitterDetails({ handleLoginClick }) {
    const { alert } = useContext()
    const [petsitter, setPetsitter] = useState(null)
    const [addReviewVisibility, setAddReviewVisibility] = useState(false)
    const { petsitterId } = useParams()

    const [userRole, setUserRole] = useState(null)

    const onLoginClick = () => handleLoginClick()

    useEffect(() => {
        try {
            logic.getPetsitterDetails(petsitterId)
                .then(petsitter => setPetsitter(petsitter))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

            if (logic.isUserLoggedIn()) {
                const role = logic.getUserRole()
                setUserRole(role)
            }

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [petsitterId, alert])



    return (<>
        <Header />
        <main className='bg-teal-100 h-screen mt-16 mb-12 flex flex-col items-center justify-start gap-4 text-[1.5rem] overflow-y-auto'>
            <Container className='text-center mb-4'>
                <Heading className='text-2xl font-bold'>Guardería</Heading>
            </Container>
            {petsitter != null ? (
                <Container className='text-lg bg-white p-3 mt-0 rounded-[50px] shadow-lg overflow-y-auto max-h-[80vh]'>
                    <Container className='flex items-center mb-4'>
                        <img src={petsitter.image} alt='Vetpoint' className='h-24 w-24 rounded-[15px] mr-4 p-2 ml-3' />

                        <Container className='flex flex-col'>
                            <Heading className='text-base font-bold'>{petsitter.name}</Heading>
                            <Paragraph className='text-sm mt-1 ml-0 font-semibold text-gray-500'>{petsitter.city}</Paragraph>
                            <Paragraph className='text-sm mt-1 ml-0 font-semibold text-gray-500'>⭐⭐⭐⭐⭐</Paragraph>
                        </Container>
                    </Container>

                    <Container>
                        <Paragraph className=' flex flex-col text-sm text-gray-700 mb-4'>{petsitter.description}</Paragraph>
                    </Container>

                    {
                        userRole === 'regular' ? (
                            <Container className='font-bold text-lg p-1 flex flex-row space-x-2'>
                                <Button className='w-36 bg-green-100 text-black rounded-full hover:bg-green-200 transition duration-200'>Contáctame</Button>
                                <Button className='w-36 bg-green-100 text-black rounded-full hover:bg-green-200 transition duration-200'>Valórame</Button>
                            </Container>

                        ) : (
                            <Link className='text-xs font-bold ' onClick={onLoginClick}>Loguéate para contactar o valorar a tu guardería</Link>
                        )
                    }

                    <Container>
                        <Heading className='items-start justify-start flex flex-row text-xl font-bold '>⭐ Reseñas</Heading>
                        <Container className='flex flex-col max-h-48 overflow-y-auto space-y-4'>
                            <img src='https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/kswgynyhsz3xfmptodmt' alt='foto koalas' className='h-24 w-24 rounded-[15px] p-2 ml-3 mr-2' />
                            <Container>
                                <Container className='flex flex-row'>
                                    <Heading className='text-sm font-bold'>Manuel Barzi</Heading>
                                    <Paragraph className='text-sm items-center my-0'>⭐⭐⭐⭐⭐</Paragraph>
                                </Container>
                                <Container>
                                    <Paragraph className=' text-sm mt-0 ml-0 text-gray-700'>Elena de Vetpoint, es muy simpática y ha cuidado fenomenal de mi iguana.</Paragraph>

                                </Container>
                            </Container>
                        </Container>
                    </Container>
                </Container>

            ) : (

                <Container >
                    <Paragraph>Cargando...</Paragraph>
                </Container>

            )}
            <Container>
                <Footer defaultTab={'petsitters'} />
            </Container>

            {addReviewVisibility && <>
                <Container className='absolute bg-black opacity-70 w-screen h-screen z-20'></Container>
                <Container>

                </Container>
            </>}
        </main>
    </>
    )
}