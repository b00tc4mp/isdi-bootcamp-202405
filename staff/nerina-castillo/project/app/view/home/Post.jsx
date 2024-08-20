import { useState, useEffect } from 'react'
import logic from '../../logic'
import formatTime from '../../util/formatTime.js'
import Button from '../library/Button'
import Time from '../library/Time'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Avatar from './Avatar'
import Confirm from '../common/Confirm'
import CreateComment from './CreateComment.jsx'

export default function Post({ post, onPostDeleted, onUserFollowToggled, onPostLikeToggled, onCommentCreated }) {
    const [confirmMessage, setConfirmMessage] = useState(null)
    const [isFollowing, setIsFollowing] = useState(post.author.following)
    const [createCommentVisible, setCreateCommentVisible] = useState(false)

    useEffect(() => {
        setIsFollowing(post.author.following)
    }, [post])

    const handleDeletePostClick = () => setConfirmMessage('delete post?')

    const handleDeletePostAccept = () => {
        try {
            logic.deletePost(post.id)
                .then(() => onPostDeleted())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeletePostCancel = () => setConfirmMessage(null)

    const handleFollowUserClick = () => {
        try {
            logic.toggleFollowUser(post.author.id)
                .then(() => {
                    setIsFollowing(prev => !prev)
                    onUserFollowToggled()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.confirmMessage)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLikePostClick = () => {
        try {
            logic.toggleLikePost(post.id)
                .then(() => onPostLikeToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleCreateCommentClick = () => setCreateCommentVisible(true)

    const handleCancelCreateCommentClick = () => setCreateCommentVisible(false)

    const handleCommentCreated = () => {
        setCreateCommentVisible(false)

        onCommentCreated()
    }

    return <article className='border-b border--b border-gray-500 ml-2 mr-2'>
        <Container className='flex justify-between items-center m-[.5rem]'>
            <Container className='flex items-center gap-1'>
                <Avatar url={post.author.avatar} />
                <Heading className='font-bold text-slate-400 text-lg'>{post.author.username}</Heading>
            </Container>

            <Button onClick={handleFollowUserClick}>{isFollowing ? 'unfollow' : 'follow'}</Button>
        </Container>

        {post.text && (
            <Paragraph className='mt-2 ml-2'>{post.text}</Paragraph>
        )}
        {post.image && (
            <Image className='mt-2' src={post.image} title={post.title} alt={post.alt} />
        )}

        <Time>{formatTime(new Date(post.date))}</Time>

        <Container className='flex justify-end w-full'>
            <Button className='mb-1' onClick={handleLikePostClick}>{(post.like ? 'dislike ' : 'like ') + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>

            {post.author.id === logic.getUserId() && <>
                <Button className='mb-1' onClick={handleDeletePostClick}>DELETE</Button>
            </>}
        </Container>

        <Button onClick={handleCreateCommentClick}>comment</Button>

        {createCommentVisible && <CreateComment
            postId={post.id}
            onCommentCreated={handleCommentCreated}
            onCancelCreateComment={handleCancelCreateCommentClick}
        />}

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel}></Confirm>}
    </article>
}