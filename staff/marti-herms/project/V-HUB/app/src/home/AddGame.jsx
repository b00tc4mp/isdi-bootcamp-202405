import { Button } from '@mui/material'

import Container from '../library/Container'
import Form from '../library/Form'
import Input from '../library/Input'

import useContext from '../context'
import logic from '../../logic'

export default function AddGame({ onAddGame }) {
    const { alert } = useContext()

    const handleRegisterSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const nameInput = form['name-input']
        const imageInput = form['image-input']
        const descriptionInput = form['description-input']
        const linkInput = form['link-input']

        const name = nameInput.value
        const image = imageInput.value
        const description = descriptionInput.value
        const link = linkInput.value

        try {
            logic.registerGame(name, image, description, link)
                .then(() => onAddGame())
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
        <Container className='flex flex-col items-center w-full h-full dark:bg-[#1e1e1e]'>
            <Form className='flex justify-center items-center h-full gap-10' onSubmit={handleRegisterSubmit}>
                <Input id='name-input' type='text' placeholder='Name' />
                <Input id='image-input' type='text' placeholder='Image' />
                <Input id='description-input' type='text' placeholder='Description' />
                <Input id='link-input' type='text' placeholder='Link' />
                <Button variant='contained' type='submit'>Add Game</Button>
            </Form>
        </Container>
    </>
}