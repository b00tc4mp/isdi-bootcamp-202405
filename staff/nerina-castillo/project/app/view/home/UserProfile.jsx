import { useEffect, useState } from 'react'
import logic from '../../logic'
import Container from '../library/Container'
import Image from '../library/Image'
import Post from './Post'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import ProfileSettings from './ProfileSettings'

export default function UserProfile() {
    const [userProfile, setUserProfile] = useState(null)
    const [editingProfile, setEditingProfile] = useState(false)
    const userId = logic.getUserId()

    useEffect(() => {
        try {
            logic.getUserProfile(userId)
                .then(profileData => {
                    setUserProfile(profileData)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    const handleProfileSettingsClick = () => setEditingProfile(true)

    const handleProfileSettingsClose = () => {
        setEditingProfile(false)
        loadUserProfile()
    }

    const handlePostDeleted = () => loadUserProfile()

    const loadUserProfile = () => {
        try {
            logic.getUserProfile(userId)
                .then(profileData => setUserProfile(profileData))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    if (!userProfile) return null

    if (editingProfile) return <ProfileSettings onClose={handleProfileSettingsClose} />

    return <Container className='bg-slate-700 text-slate-300 mt-[64px]'>
        <Container className='flex items-center ml-2'>
            <Image src={userProfile.avatar} alt={`${userProfile.username}'s avatar`} className='w-20 h-20 rounded-full clip-path-40' />
            <Container className='ml-4 flex items-center justify-between w-full'>
                <Heading className='text-xl font-bold'>{userProfile.username}</Heading>
                <Button onClick={handleProfileSettingsClick}>
                    <Image className='w-[20px] h-[20px]' src='./edit.png' />
                </Button>
            </Container>
        </Container>
        <Paragraph className='mb-4 border-b border--b border-gray-500 mx-4 py-2'>{userProfile.description}</Paragraph>
        <Container className='-mt-6'>
            {userProfile.posts.map(post => <Post
                key={post.id}
                post={post}
                onPostDeleted={handlePostDeleted}
            />)}
        </Container>
    </Container>
}