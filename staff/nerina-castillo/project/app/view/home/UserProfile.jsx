import { useEffect, useState } from 'react'
import logic from '../../logic'
import Container from '../library/Container'
import Image from '../library/Image'
import Post from './Post'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'

export default function UserProfile() {
    const [userProfile, setUserProfile] = useState(null)
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

    if (!userProfile) {
        return null
    }

    return <Container className='bg-slate-700 text-slate-300 mt-[60px]'>
        <Container className='flex items-center mb-6'>
            <Image src={userProfile.avatar} alt={`${userProfile.username}'s avatar`} className='w-20 h-20 rounded-full clip-path-40' />
            <Container className='ml-4'>
                <Heading className='text-xl font-bold'>{userProfile.username}</Heading>
            </Container>
        </Container>
        <Paragraph className='mb-4'>{userProfile.description}</Paragraph>
        {userProfile.posts.map(post => <Post key={post.id} post={post} />)}
    </Container>
}