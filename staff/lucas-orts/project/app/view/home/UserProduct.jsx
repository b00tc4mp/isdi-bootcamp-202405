import logic from '../../logic'

import { useState } from 'react'

import Button from '../library/Button'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Confirm from '../common/Confirm'

import ImageProduct from './ImageProduct'
import PriceProduct from './PriceProduct'
import LocationProduct from './LocationProduct'

export default function UserProduct({ product, onProductEnableToggled, onProductDeleted, onProductImageEdited, onProductPriceEdited, onProductLocationEdited }) {

    const [isEditImageProductModalVisible, setIsEditImageProductModalVisible] = useState(false)
    const [isEditPriceProductModalVisible, setIsEditPriceProductModalVisible] = useState(false)
    const [isEditLocationProductModalVisible, setIsEditLocationProductModalVisible] = useState(false)

    const [confirmMessage, setConfirmMessage] = useState(null)

    const handleDeleteProductClick = () => setConfirmMessage('Delete Product?')

    const handleDeleteProductAccept = () => {
        try {
            logic.deleteProduct(product.id)
                .then(() => onProductDeleted())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteProductCancel = () => setConfirmMessage(null)

    const handleEditImageProductClick = () => {
        setIsEditImageProductModalVisible(true)
        setIsEditPriceProductModalVisible(false)
        setIsEditLocationProductModalVisible(false)
    }

    const handleEditLocationProductClick = () => {
        setIsEditLocationProductModalVisible(true)
        setIsEditImageProductModalVisible(false)
        setIsEditPriceProductModalVisible(false)
    }

    const handleEditPriceProductClick = () => {
        setIsEditPriceProductModalVisible(true)
        setIsEditLocationProductModalVisible(false)
        setIsEditImageProductModalVisible(false) // Ensure EditImageProduct modal is hidden
    }

    const handleEnableProductClick = () => {

        try {
            logic.toggleProductEnable(product.id)
                .then(() => onProductEnableToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCancel = () => {
        setIsEditPriceProductModalVisible(false)
        setIsEditLocationProductModalVisible(false)
        setIsEditImageProductModalVisible(false)
    }

    const handleAccept = () => {
        setIsEditPriceProductModalVisible(false)
        setIsEditLocationProductModalVisible(false)
        setIsEditImageProductModalVisible(false)
    }

    return <article className='border border-black rounded-lg mx-4 mt-4'>
        <Container className=' w-full h-full flex-col gap-0 items-center p-0'>
            <Heading level='4' className='font-semibold text-lg'>{product.id}</Heading>
            <Container className=' w-full h-full flex gap-0 justify-between p-0'>
                <Container className='w-8/10 flex-col items-start'>
                    <Container className='flex space-x-0.5'>
                        <Paragraph className='font-semibold'>Name:</Paragraph>
                        <Paragraph>{product.name}</Paragraph>
                    </Container>
                    <Container className='flex'>
                        <Paragraph className='font-semibold'>Type:</Paragraph>
                        <Paragraph>{product.type}</Paragraph>
                    </Container>
                    <Container className='flex items-center'>
                        <Paragraph className='font-semibold'>Price:</Paragraph>
                        <Paragraph>{product.minprice} - {product.maxprice}</Paragraph>
                        <Button onClick={handleEditPriceProductClick} className='flex items-center'>
                            <Image src='/icons/edit.svg' alt='edit icon' className='h-[30px] w-[30px]' />
                        </Button>
                    </Container>
                </Container>

                <Container className='flex-col items-center justify-between '>
                    <Container className='max-h-40 max-w-60 overflow-hidden object-contain border border-gray-300 rounded-lg'>
                        <Image className='max-h-60' src={product.image} alt={product.name} />
                    </Container>
                    <Container className='flex items-center'>
                        <Button onClick={handleEditImageProductClick} className='flex items-center'>
                            <Image src='/icons/image.svg' alt='image icon' className='h-[30px] w-[30px]' />
                        </Button>

                    </Container>
                </Container>

                <Container className='flex-col items-center justify-around'>
                    <Button onClick={handleEnableProductClick} className='flex items-center'>
                        {product.enabled ? (
                            <Image src='/icons/enable.svg' alt='enable icon' className='h-[30px] w-[30px]' />
                        ) : (
                            <Image src='/icons/enable-off.svg' alt='enable off icon' className='h-[30px] w-[30px]' />
                        )}
                    </Button>
                    <Button onClick={handleDeleteProductClick} className='flex items-center'>
                        <Image src='/icons/delete.svg' alt='delete icon' className='h-[30px] w-[30px]' />
                    </Button>
                    <Button onClick={handleEditLocationProductClick} className='flex items-center'>
                        <Image src='/icons/location.svg' alt='location icon' className='h-[30px] w-[30px]' />
                    </Button>

                </Container>
            </Container>
        </Container>

        {isEditPriceProductModalVisible && (
            <PriceProduct
                message='Confirm EditPriceProduct change?'
                product={product}
                onAccept={() => {
                    handleAccept()
                    onProductPriceEdited()  // Llama al evento para recargar productos
                }}
                onCancel={handleCancel}
            />
        )}

        {isEditImageProductModalVisible && (
            <ImageProduct
                message='Confirm image change?'
                product={product}
                onAccept={() => {
                    handleAccept()
                    onProductImageEdited()  // Llama al evento para recargar productos
                }}
                onCancel={handleCancel}
            />
        )}

        {isEditLocationProductModalVisible && (
            <LocationProduct
                message='Confirm image change?'
                product={product}
                onAccept={() => {
                    handleAccept()
                    onProductLocationEdited()  // Llama al evento para recargar productos
                }}
                onCancel={handleCancel}
            />
        )}

        {/* Mensaje de confirmación */}
        {confirmMessage && (
            <Confirm
                message={confirmMessage}
                onAccept={handleDeleteProductAccept}
                onCancel={handleDeleteProductCancel}
            />
        )}
    </article>
}