import React, { useState } from 'react'
import Container from '../library/Container'
import Button from '../library/Button'

import AddressForm from './AddressForm'
import PhoneForm from './PhoneForm'
import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'

export default function Profile() {
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false)
    const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false)
    const [isEmailModalVisible, setIsEmailModalVisible] = useState(false)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)


    const handleAddressClick = () => {
        setIsAddressModalVisible(true)
        setIsEmailModalVisible(false)
        setIsPasswordModalVisible(false)
        setIsPhoneModalVisible(false)
    }

    const handlePhoneClick = () => {
        setIsPhoneModalVisible(true)
        setIsEmailModalVisible(false)
        setIsPasswordModalVisible(false)
        setIsAddressModalVisible(false)
    }

    const handleEmailClick = () => {
        setIsEmailModalVisible(true)
        setIsPhoneModalVisible(false)
        setIsPasswordModalVisible(false)
        setIsAddressModalVisible(false)
    }

    const handlePasswordClick = () => {
        setIsPasswordModalVisible(true)
        setIsEmailModalVisible(false)
        setIsPhoneModalVisible(false)
        setIsAddressModalVisible(false)
    }


    const handleCancel = () => {
        setIsEmailModalVisible(false)
        setIsPasswordModalVisible(false)
        setIsAddressModalVisible(false)
        setIsPhoneModalVisible(false)
    }


    const handleAccept = () => {
        setIsEmailModalVisible(false)
        setIsPasswordModalVisible(false)
        setIsAddressModalVisible(false)
        setIsPhoneModalVisible(false)
    }

    return (
        <Container className='relative flex flex-col gap-4 mt-8 bt-12'>
            <Button onClick={handleEmailClick} className='border border-black rounded-full p-0.5 mb-2'>Modify Email</Button>
            {isEmailModalVisible && (
                <EmailForm
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                />
            )}

            <Button onClick={handlePasswordClick} className='border border-black rounded-full p-0.5 mb-2'>Modify Password</Button>
            {isPasswordModalVisible && (
                <PasswordForm
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                />
            )}

            <Button onClick={handlePhoneClick} className='border border-black rounded-full p-0.5 mb-2'>Modify Phone</Button>
            {isPhoneModalVisible && (
                <PhoneForm
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                />
            )}

            <Button onClick={handleAddressClick} className='border border-black rounded-full p-0.5 mb-2'>Modify Address</Button>
            {isAddressModalVisible && (
                <AddressForm
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                />
            )}

        </Container>
    )
}