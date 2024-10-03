// Profile.js
import React, { useState } from 'react'
import Container from '../library/Container'
import Button from '../library/Button'
import AddressForm from './AddressForm'
import Phone from './Phone'
import Email from './Email'
import Password from './Password'

export default function Profile() {
    // Separate states to control which modal is visible
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false)
    const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false)
    const [isEmailModalVisible, setIsEmailModalVisible] = useState(false)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)

    // Handlers for showing modals
    const handleAddressClick = () => {
        setIsAddressModalVisible(true)
        setIsEmailModalVisible(false)
        setIsPasswordModalVisible(false)
        setIsPhoneModalVisible(false) // Ensure phone modal is hidden
    }

    const handlePhoneClick = () => {
        setIsPhoneModalVisible(true)
        setIsEmailModalVisible(false)
        setIsPasswordModalVisible(false)
        setIsAddressModalVisible(false) // Ensure address modal is hidden
    }

    const handleEmailClick = () => {
        setIsEmailModalVisible(true)
        setIsPhoneModalVisible(false)
        setIsPasswordModalVisible(false)
        setIsAddressModalVisible(false) // Ensure address modal is hidden
    }

    const handlePasswordClick = () => {
        setIsPasswordModalVisible(true)
        setIsEmailModalVisible(false)
        setIsPhoneModalVisible(false)
        setIsAddressModalVisible(false) // Ensure address modal is hidden
    }

    // Handler for cancel action in modals
    const handleCancel = () => {
        setIsEmailModalVisible(false)
        setIsPasswordModalVisible(false)
        setIsAddressModalVisible(false)
        setIsPhoneModalVisible(false)
    }

    // Handler for submit action in modals
    const handleAccept = () => {
        // Perform any other logic if needed after email, password, address or phone submission
        setIsEmailModalVisible(false)
        setIsPasswordModalVisible(false)
        setIsAddressModalVisible(false)
        setIsPhoneModalVisible(false)
    }

    return (
        <Container className='relative flex flex-col gap-4'>
            <Button onClick={handleEmailClick}>Modify Email</Button>
            {/* Render the Phone modal conditionally */}
            {isEmailModalVisible && (
                <Email
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                />
            )}

            <Button onClick={handlePasswordClick}>Modify Password</Button>
            {/* Render the Phone modal conditionally */}
            {isPasswordModalVisible && (
                <Password
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                />
            )}

            <Button onClick={handlePhoneClick}>Modify Phone</Button>
            {/* Render the Phone modal conditionally */}
            {isPhoneModalVisible && (
                <Phone
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                />
            )}

            <Button onClick={handleAddressClick}>Modify Address</Button>
            {/* Render the Address modal conditionally */}
            {isAddressModalVisible && (
                <AddressForm
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                />
            )}

        </Container>
    )
}