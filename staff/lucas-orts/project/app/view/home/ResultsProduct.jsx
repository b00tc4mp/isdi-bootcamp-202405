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
    const [loadedProduct, setLoadedProduct] = useState(null)

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
        // Cargar el producto antes de mostrar el modal
        logic.productInfo(product.id)
            .then(loadedProduct => {
                setLoadedProduct(loadedProduct)
                setIsProductInfo(true)
            })
            .catch(error => {
                console.error(error)
                alert(error.message)
            })
    }

    const handleCancel = () => setIsProductInfo(false)

    const handleAddCartProductCancel = () => setConfirmMessage(null)

    return <article className='w-full p-4'>
        <Container className='flex-col items-center  border border-black rounded-lg m-0 p-1'>
            <Heading level='4' className='font-semibold text-lg'>{product.id}</Heading>
            <Container className='flex justify-between space-x-4'>
                {/* Información del producto */}
                <Container className='flex-col items-start justify-center'>
                    <Container className='flex'>
                        <Paragraph className='font-semibold'>Name:</Paragraph>
                        <Paragraph>{product.name}</Paragraph>
                    </Container>
                    {product.type && (
                        <Container className='flex'>
                            <Paragraph className='font-semibold'>Type:</Paragraph>
                            <Paragraph>{product.type}</Paragraph>
                        </Container>
                    )}
                    <Container className='flex'>
                        <Paragraph className='font-semibold'>Price:</Paragraph>
                        <Paragraph>{product.minprice} - {product.maxprice}</Paragraph>
                    </Container>
                </Container>

                {/* Imagen del producto */}
                <Container className='flex-col items-center justify-between space-y-4'>
                    <Image
                        src={product.image}
                        alt={product.name}
                        className='w-[100px] h-[100px] object-contain border border-gray-300 rounded-lg'
                    />

                    {/* Botones con espaciado uniforme */}
                    <Container className='flex space-x-4'>
                        <Button onClick={handleAddCartProductClick}>
                            <Image
                                src='/icons/cart.svg'
                                alt='cart icon'
                                className='h-[30px] w-[30px]'
                            />
                        </Button>
                        <Button onClick={handleProductInfoClick}>
                            <Image
                                src='/icons/information-circle-outline.svg'
                                alt='info icon'
                                className='h-[30px] w-[30px]'
                            />
                        </Button>
                    </Container>


                </Container>
            </Container>
        </Container>
        {/* Mostrar ProductInfo si está cargado */}
        {isProductInfo && loadedProduct && (
            <ProductInfo
                product={loadedProduct}
                onCancel={handleCancel}
            />
        )}
        {/* Mensaje de confirmación */}
        {confirmMessage && (
            <Confirm
                message={confirmMessage}
                onAccept={handleAddCartProductAccept}
                onCancel={handleAddCartProductCancel}
            />
        )}
    </article>
}