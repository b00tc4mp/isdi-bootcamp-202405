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

export default function UserProduct({ product, onProductEnableToggled, onProductDeleted, onProductImageEdited, onProductPriceEdited }) {

    const [isEditImageProductModalVisible, setIsEditImageProductModalVisible] = useState(false)
    const [isEditPriceProductModalVisible, setIsEditPriceProductModalVisible] = useState(false)

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
        // setIsPasswordModalVisible(false)
    }

    const handleEditPriceProductClick = () => {
        setIsEditPriceProductModalVisible(true)
        // setIsPasswordModalVisible(false)
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
        // setIsPasswordModalVisible(false)
        setIsEditImageProductModalVisible(false)
    }

    const handleAccept = () => {
        setIsEditPriceProductModalVisible(false)
        // setIsPasswordModalVisible(false)
        setIsEditImageProductModalVisible(false)
    }

    return <article className='shadow-[1px_1px_10px_1px_lightgray]'>
        <Container>
            <Container className='items-start'>
                <Paragraph>Name:</Paragraph>
                <Paragraph>{product.name}</Paragraph>
                <Paragraph>Type:</Paragraph>
                <Paragraph>{product.type}</Paragraph>
                <Paragraph>Price:</Paragraph>
                <Paragraph>{product.minprice} - {product.maxprice}</Paragraph>
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
        <Container>
            <Button onClick={handleEnableProductClick}>{product.enabled ? <Image src='/icons/enable.svg' alt='enable icon' className='h-[30px] w-[30px]' /> : <Image src='/icons/enable-off.svg' alt='enable off icon' className='h-[30px] w-[30px]' />}</Button>
            <Button onClick={handleDeleteProductClick}>🗑️</Button>
        </Container>
        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeleteProductAccept} onCancel={handleDeleteProductCancel} />}
    </article>
}