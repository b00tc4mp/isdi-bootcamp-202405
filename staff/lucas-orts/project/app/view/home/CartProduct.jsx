import logic from '../../logic'

import Button from '../library/Button'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'


import Confirm from '../common/Confirm'

import { useState } from 'react'


export default function CartProduct({ product, onProductCartDeleted }) {

    const [confirmMessage, setConfirmMessage] = useState(null)

    const handleDeleteCartProductClick = () => setConfirmMessage('Delete Product from cart?')

    const handleDeleteCartProductAccept = () => {
        try {
            logic.deleteCartProduct(product.id)
            onProductCartDeleted() // Acción después de añadir al carrito
            setConfirmMessage(null)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleDeleteCartProductCancel = () => setConfirmMessage(null)

    return <article className='border border-black rounded-lg p-4 m-4'>
        <Container className='flex-col items-center'>
            <Heading level='4' className='font-semibold text-lg'>{product.id}</Heading>
            <Container className='flex justify-between space-x-4'>
                <Container className='flex-col items-start'>
                    <Container className='flex items-start justify-start'>
                        <Paragraph className='font-semibold'>Name:</Paragraph>
                        <Paragraph>{product.name}</Paragraph>
                    </Container>
                    <Container className='flex'>
                        <Paragraph className='font-semibold'>Type:</Paragraph>
                        <Paragraph>{product.type}</Paragraph>
                    </Container>
                    <Container className='flex'>
                        <Paragraph className='font-semibold'>Price:</Paragraph>
                        <Paragraph>{product.minprice} - {product.maxprice}</Paragraph>
                    </Container>
                </Container>
                <Container className='flex-col items-center justify-between space-y-4'>
                    <Image src={product.image} alt={product.name} className='w-[100px] h-[100px] object-contain border border-gray-300 rounded-lg' />
                    <Container className='flex space-x-4'>
                        <Button onClick={handleDeleteCartProductClick}>
                            <Image src='/icons/delete.svg' alt='delete icon' className='h-[30px] w-[30px]' />
                        </Button>
                    </Container>
                </Container>
            </Container>
        </Container>

        {/* Mensaje de confirmación */}
        {confirmMessage && (
            <Confirm
                message={confirmMessage}
                onAccept={handleDeleteCartProductAccept}
                onCancel={handleDeleteCartProductCancel}
            />
        )}
    </article>
}