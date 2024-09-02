import { useState, useEffect } from 'react'
import useContext from '../context.js'

import logic from '../../logic'

import Heading from '../library/Heading'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/Button'
import Image from '../library/Image'
import Form from '../library/Form'
import Paragraph from '../library/Paragraph'

export default function ProfileSettings({ onAvatarUpdated }) {
    const [user, setUser] = useState(null)
    const [editAvatarVisible, setEditAvatarVisible] = useState(false)
    const [editPasswordVisible, setEditPasswordVisible] = useState(false)
    const [infoFlags, setInfoFlags] = useState(false)
    const { alert } = useContext()

    const userId = logic.getUserId()

    useEffect(() => {
        try {
            logic.getUser(userId)
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleEditAvatarClick = () => {
        setEditAvatarVisible(true)
        setEditPasswordVisible(false)
    }

    const handleCancelEditAvatarClick = () => {
        setEditAvatarVisible(false)
        setInfoFlags(false)
    }

    const handleEditAvatarImageClick = (newAvatar) => {
        try {
            if (newAvatar === 'none')
                newAvatar = '/profileIcon.svg'

            logic.updateAvatar(newAvatar)
                .then(() => {
                    setEditAvatarVisible(false)

                    onAvatarUpdated()

                    return logic.getUser(userId)
                })
                .then(user => setUser(user))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleEditPasswordClick = () => {
        setEditPasswordVisible(true)
        setEditAvatarVisible(false)
    }

    const handleCancelEditPasswordClick = () => setEditPasswordVisible(false)

    const handleEditPasswordSubmit = event => {
        event.preventDefault()

        const form = event.target

        const editOldPasswordInput = form['edit-oldPassword-input']
        const editNewPasswordInput = form['edit-newPassword-input']
        const editNewPasswordRepeatInput = form['edit-newPasswordRepeat-input']

        const oldPassword = editOldPasswordInput.value
        const newPassword = editNewPasswordInput.value
        const newPasswordRepeat = editNewPasswordRepeatInput.value

        try {
            logic.updatePassword(oldPassword, newPassword, newPasswordRepeat)
                .then(() => setEditPasswordVisible(false))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleInfoClick = () => {
        if (infoFlags)
            setInfoFlags(false)
        else setInfoFlags(true)
    }

    return <section className="flex flex-col items-center gap-3">
        <Heading className="text-[30px] items-center font-semibold mt-3">Profile Settings</Heading>
        <Container className=" items-center justify-center" >
            <Container className="flex flex-col items-center gap-3">
                <Image src={!user?.avatar ? "/profileIcon.svg" : user.avatar} className="w-[170px] h-[170px] rounded-xl" />
                <Button className="border border-gray-600 rounded-xl w-36 h-10 bg-gradient-to-br text-gray-600 font-bold" onClick={handleEditAvatarClick}>Edit Your Avatar</Button>
            </Container>

            {editAvatarVisible &&
                <>
                    <Container className="fixed w-screen top-0 left-0 h-screen bg-black opacity-70 z-40"></Container>

                    <Container className="fixed w-screen top-0 left-0 h-screen flex items-center justify-center z-50">
                        <Container className="p-6 border shadow-lg bg-white h-[45rem] w-[90%] flex flex-col items-center gap-5 rounded-xl overflow-scroll">
                            <Container className="grid grid-cols-4 gap-4 break-all">
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/2017-Gilbert-baker-pride-flag.avif")} className={``} >
                                        <Image src="/2017-Gilbert-baker-pride-flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Gilbert Baker Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Gilbert Baker Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Gay_Pride_Flag.svg.avif")} className={``} >
                                        <Image src="/Gay_Pride_Flag.svg.avif" className="h-[70px] w-[70px] rounded-xl" alt="Gay Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Traditional Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Philly_Pride_Flag.avif")} className={``} >
                                        <Image src="/Philly_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Philly Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Philadelphia Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Progress_Flag.avif")} className={``} >
                                        <Image src="/Progress_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Progress Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Progress Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Intersex-inclusive_pride_flag.avif")} className={``} >
                                        <Image src="/Intersex-inclusive_pride_flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Intersex-Inclusive Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Intersex-Inclusive Progress Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Queer_Flag.avif")} className={``} >
                                        <Image src="/Queer_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Queer Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Queer Pride Flag</Paragraph>}
                                </Container>
                                <Container className="cursor-pointer">
                                    <Button onClick={() => handleEditAvatarImageClick("/Lesbian_Pride_Flag.avif")} className={``} >
                                        <Image src="/Lesbian_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Lesbian Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Lesbian Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Trans_Gay_Pride_Flag.avif")} className={``} >
                                        <Image src="/Trans_Gay_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Trans Gay Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Trans-Inclusive Gay Men's Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Bisexual_Pride_Flag.avif")} className={``} >
                                        <Image src="/Bisexual_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Bisexual Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Bisexual Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Pansexual_Pride_Flag.avif")} className={``} >
                                        <Image src="/Pansexual_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Pansexual Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Pansexual Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Asexual_Pride_Flag.avif")} className={``} >
                                        <Image src="/Asexual_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Asexual Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Asexual Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Demisexual_Pride_Flag.avif")} className={``} >
                                        <Image src="/Demisexual_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Demisexual Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Demisexual Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Polyamory_Pride_Flag.avif")} className={``} >
                                        <Image src="/Polyamory_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Polyamory Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Polyamory Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Polysexual_Pride_Flag.avif")} className={``} >
                                        <Image src="/Polysexual_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Polysexual Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Polysexual Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Trans_Flag.avif")} className={``} >
                                        <Image src="/Trans_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Trans Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Transgender Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Non-binary_Pride_Flag.avif")} className={``} >
                                        <Image src="/Non-binary_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Non-binary Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Nonbinary Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Intersex_Pride_Flag.avif")} className={``} >
                                        <Image src="/Intersex_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Intersex Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Intersex Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Genderfluid_Pride_Flag.avif")} className={``} >
                                        <Image src="/Genderfluid_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Genderfluid Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Genderfluid Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Genderqueer_Pride_Flag.avif")} className={``} >
                                        <Image src="/Genderqueer_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Genderqueer Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Genderqueer Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Agender_Pride_Flag.avif")} className={``} >
                                        <Image src="/Agender_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Agender Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Agender Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Bigender_Pride_Flag.avif")} className={``} >
                                        <Image src="/Bigender_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Bigender Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Bigender Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Demigender_Pride_Flag.avif")} className={``} >
                                        <Image src="/Demigender_Pride_Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Demigender Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Demigender Pride Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/Pride-of-Africa-Flag.avif")} className={``} >
                                        <Image src="/Pride-of-Africa-Flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Pride of Africa Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Pride of Africa Flag</Paragraph>}
                                </Container>
                                <Container>
                                    <Button onClick={() => handleEditAvatarImageClick("/queer-people-of-color-pride-flag.avif")} className={``} >
                                        <Image src="/queer-people-of-color-pride-flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Queer People of Color Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center">Queer People of Color Pride Flag</Paragraph>}
                                </Container>
                            </Container>
                            <Container className="flex flex-row justify-around w-full">
                                <Container className="break-all">
                                    <Button onClick={() => handleEditAvatarImageClick("/two-spirit-pride-flag.avif")} className={``} >
                                        <Image src="/two-spirit-pride-flag.avif" className="h-[70px] w-[70px] rounded-xl" alt="Two Spirit Pride Flag" />
                                    </Button>
                                    {infoFlags && <Paragraph className="text-xs flex self-center ">Two-Spirit<br />Pride Flag</Paragraph>}
                                </Container>
                                <Container className=" flex flex-col">
                                    <Button onClick={() => handleEditAvatarImageClick("none")} className="flex items-center justify-center border-black border-2 rounded-xl h-[70px] w-[70px]" >
                                        <Image src="/stop.svg" className="h-[60px] w-[60px]" alt="None" />
                                    </Button>
                                    <Paragraph className="text-xs flex self-center">None</Paragraph>
                                </Container>
                            </Container>
                            <Container className="flex justify-around gap-4 w-full">
                                <Button className="border border-gray-600 rounded-xl w-28 h-10 bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 font-bold" type="button" onClick={handleCancelEditAvatarClick}>Cancel</Button>
                                <Button className="border border-gray-600 rounded-xl w-28 h-10 bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 font-bold" type="button" onClick={handleInfoClick}>Info</Button>
                            </Container>
                        </Container>
                    </Container>
                </>
            }

            <Container className="flex flex-col gap-6">
                <Heading level="2" className="font-medium text-xl text-center mt-5">Personal Informations</Heading>
                <Paragraph className="text-center text-xl">{user?.name}</Paragraph>
                <Paragraph className="text-center text-xl">{user?.surname}</Paragraph>
                <Paragraph className="text-center text-xl">{user?.username}</Paragraph>
                <Paragraph className="text-center text-xl">{user?.email}</Paragraph>
            </Container>
        </Container >

        <Button className="border border-gray-600 rounded-xl w-36 h-10 bg-gradient-to-br text-gray-600 font-bold mt-2" onClick={handleEditPasswordClick}>Edit Password</Button>
        {
            editPasswordVisible &&
            <Container className="flex flex-col content-center items-center mb-8 gap-3">
                <Form className="flex flex-col items-center gap-2" onSubmit={handleEditPasswordSubmit}>
                    <Input className="border-gray-600 rounded-[15px] text-center" id="edit-oldPassword-input" type="password" placeholder="Old password" />
                    <Input className="border-gray-600 rounded-[15px] text-center" id="edit-newPassword-input" type="password" placeholder="New password" />
                    <Input className="border-gray-600 rounded-[15px] text-center" id="edit-newPasswordRepeat-input" type="password" placeholder="Repeat new password" />

                    <Container className="flex content-center gap-4">
                        <Button className="border border-gray-600 rounded-xl w-28 h-10 bg-gradient-to-br text-gray-600 font-bold" type="submit">Save</Button>
                        <Button className="border border-gray-600 rounded-xl w-28 h-10 bg-gradient-to-br text-gray-600 font-bold" type="button" onClick={handleCancelEditPasswordClick}>Cancel</Button>
                    </Container >
                </Form >
            </Container >
        }
    </section >
}