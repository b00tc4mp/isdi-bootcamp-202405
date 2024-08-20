import logic from '../../logic/index.js'

import Heading from '../library/Heading.jsx'
import Form from '../library/Form.jsx'
import Input from '../library/Input.jsx'
import Label from '../library/Label.jsx'
import Button from '../library/Button.jsx'
import Container from '../library/Container.jsx'

export default function CreatePetsitter({ onPetsitterCreated, onCancelCreatePetsitter }) {
    const [selectedPets, setSelectedPets] = useState([])

    const handleCreatePetsitterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const petsitterimageInput = form['petsitter-image-input']
        const petsitterNameInput = form['petsitter-name-input']
        const petsitterCityInput = form['petsitter-city-input']
        const petsitterDescriptionInput = form['petsitter-description-input']
        const petsitterPetsInput = form['petsitter-pets-input']

        const petsitterImage = petsitterimageInput.value
        const petsitterName = petsitterNameInput.value
        const petsitterCity = petsitterCityInput.value
        const petsitterDescription = petsitterDescriptionInput.value
        const petsitterPets = petsitterPetsInput.value

        try {
            logic.CreatePetsitter(petsitterImage, petsitterName, petsitterCity, petsitterDescription, petsitterPets)
                .then(() => onPetsitterCreated())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error

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

    const handleCancelCreateEventClick = () => {
        onCancelCreatePetsitter()
    }

    return <section>
        <Heading className='text-center mb-6 pt-8 text-2xl font-bold'>Crear guardería</Heading>

        <Form onSubmit={handleCreatePetsitterSubmit}>
            <Container className='flex-col items-start'>
                <Container>
                    <Label htmlFor='petsitter-image-input'>Imagen de la guardería</Label>
                    <Input className='w-11/12' id='petsitter-image-input' placeholder='Imagen de la guardería'></Input>
                </Container>

                <Container>
                    <Label htmlFor='petsitter-name-input'>Nombre de la guardería</Label>
                    <Input className='w-11/12' id='petsitter-name-input' placeholder='Nombre de la guardería'></Input>
                </Container>

                <Container>
                    <Label htmlFor='petsitter-city-input'>Ciudad</Label>
                    <Input className='w-11/12' id='petsitter-city-input' placeholder='Ciudad'></Input>
                </Container>

                <Container>
                    <Label htmlFor='petsitter-description-input'>Descripción</Label>
                    <Input className='w-11/12' id='petsitter-descrition-input' placeholder='Descripción'></Input>
                </Container>

                <Container>
                    <label htmlFor='pets-input'>¿Qué animales cuidas?</label><br /><br />

                    <input
                        type='checkbox'
                        id='rabbit-input'
                        value='Rabbit'
                        onChange={handlePetChange}
                    />
                    <label htmlFor='rabbit-input'>Conejos</label><br />

                    <input
                        type='checkbox'
                        id='guinea-pig-input'
                        value='GuineaPig'
                        onChange={handlePetChange}
                    />
                    <label htmlFor='guinea-pig-input'>Cobayas</label><br />

                    <input
                        type='checkbox'
                        id='hamsters-input'
                        value='Hamsters'
                        onChange={handlePetChange}
                    />
                    <label htmlFor='hamsters-input'>Hamsters</label><br />

                    <input
                        type='checkbox'
                        id='birds-input'
                        value='Birds'
                        onChange={handlePetChange}
                    />
                    <label htmlFor='birds-input'>Aves</label><br />

                    <input
                        type='checkbox'
                        id='reptiles-input'
                        value='Reptiles'
                        onChange={handlePetChange}
                    />
                    <label htmlFor='reptiles-input'>Reptiles</label><br /><br />
                </Container>

                <Container className='flex justify-center gap-1rem'>
                    <Button className='w-36 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200' type='submit'>Ok</Button>
                    <Button className='w-36 font-bold bg-green-100 text-black p-2 rounded-full hover:bg-green-200 transition duration-200' type='reset' onClick={handleCancelCreateEventClick}>Cancel</Button>
                </Container>

            </Container>
        </Form>
    </section>
}