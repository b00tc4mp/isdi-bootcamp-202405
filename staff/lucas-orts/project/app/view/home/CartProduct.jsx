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

    return <article className='shadow-[1px_1px_10px_1px_lightgray]'>
        <Container>
            <Container className='items-start'>
                <Paragraph>Name:</Paragraph>
                <Paragraph>{product.name}</Paragraph>
                <Paragraph>Type:</Paragraph>
                <Paragraph>{product.type}</Paragraph>
                <Paragraph>Price:</Paragraph>
                <Paragraph>{product.minprice} - {product.maxprice}</Paragraph>
            </Container>
        </Container>
        <Container>
            <Image src={product.image} alt={product.name} className='w-full' />
        </Container>
        <Container>
            <Button onClick={handleDeleteCartProductClick}><Image src='/icons/delete.svg' alt='delete icon' className='h-[30px] w-[30px]' /></Button>
        </Container>
        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeleteCartProductAccept} onCancel={handleDeleteCartProductCancel} />}
    </article>
}