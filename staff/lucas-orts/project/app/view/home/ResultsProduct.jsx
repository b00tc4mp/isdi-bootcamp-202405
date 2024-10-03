import logic from '../../logic'

import Button from '../library/Button'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Confirm from '../common/Confirm'

import ProductInfo from './ProductInfo'

import { useState } from 'react'

export default function ResultsProduct({ product, onProductAdded }) {
    const [confirmMessage, setConfirmMessage] = useState(null)
    const [isProductInfo, setIsProductInfo] = useState(false)

    const handleAddCartProductClick = () => setConfirmMessage('Add Product to cart?')

    const handleAddCartProductAccept = () => {
        try {
            logic.addCartProduct(product.id)
            onProductAdded() // Acción después de añadir al carrito
            setConfirmMessage(null)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }
    const handleProductInfoClick = () => {
        try {
            logic.productInfo(product.id)
            setIsProductInfo(true)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleCancel = () => setIsProductInfo(false)

    const handleAddCartProductCancel = () => setConfirmMessage(null)

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
            <Button onClick={handleAddCartProductClick}><Image src='/icons/cart.svg' alt='cart icon' className='h-[30px] w-[30px]' /></Button>
            <Button onClick={handleProductInfoClick}><Image src='/icons/information-circle-outline.svg' alt='info icon' className='h-[30px] w-[30px]' /></Button>
            {isProductInfo && (
                <ProductInfo
                    key={product.id}
                    product={product}
                    onCancel={handleCancel}
                />
            )}
        </Container>
        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleAddCartProductAccept} onCancel={handleAddCartProductCancel} />}
    </article>
}