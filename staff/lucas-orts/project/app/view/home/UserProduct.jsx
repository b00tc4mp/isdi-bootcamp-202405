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

    return <article className='shadow-[1px_1px_10px_1px_lightgray]'>
        <Container className='flex-row'>
            <Container className='flex-col items-start'>
                <Container className='flex-row'>
                    <Paragraph>Name:</Paragraph>
                    <Paragraph>{product.name}</Paragraph>
                </Container>
                <Container className='flex-row'>
                    <Paragraph>Type:</Paragraph>
                    <Paragraph>{product.type}</Paragraph>
                </Container>
                <Container className='flex-row'>
                    <Container className='flex-col'>
                        <Paragraph>Price:</Paragraph>
                        <Paragraph>{product.minprice} - {product.maxprice}</Paragraph>
                    </Container>
                    <Button onClick={handleEditPriceProductClick}><Image src='/icons/edit.svg' alt='edit icon' className='h-[30px] w-[30px]' /></Button>
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
                </Container>
            </Container>
            <Container>
                <Image src={product.image} alt={product.name} className='w-full' />

                <Button onClick={handleEditImageProductClick}><Image src='/icons/image.svg' alt='image icon' className='h-[30px] w-[30px]' /></Button>
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
            </Container>
            <Container className='flex-row'>
                <Button onClick={handleEnableProductClick}>{product.enabled ? <Image src='/icons/enable.svg' alt='enable icon' className='h-[30px] w-[30px]' /> : <Image src='/icons/enable-off.svg' alt='enable off icon' className='h-[30px] w-[30px]' />}</Button>
                <Button onClick={handleDeleteProductClick}><Image src='/icons/delete.svg' alt='delete icon' className='h-[30px] w-[30px]' /></Button>
                <Button onClick={handleEditLocationProductClick}><Image src='/icons/location.svg' alt='location icon' className='h-[30px] w-[30px]' /></Button>
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
            </Container>
        </Container>
        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeleteProductAccept} onCancel={handleDeleteProductCancel} />}
    </article>
}