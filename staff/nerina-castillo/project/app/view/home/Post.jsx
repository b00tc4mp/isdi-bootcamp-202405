import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import logic from '../../logic'
import formatTime from '../../util/formatTime.js'
import Button from '../library/Button'
import Time from '../library/Time'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Avatar from './Avatar'
import CommentList from './CommentList'
import Confirm from '../common/Confirm'

export default function Post({ post, onPostDeleted, onUserFollowToggled, onPostLikeToggled }) {
    const [confirmMessage, setConfirmMessage] = useState(null)
    const [isFollowing, setIsFollowing] = useState(post.author.following)
    const [comments, setComments] = useState([])
    const [commentsVisible, setCommentsVisible] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setIsFollowing(post.author.following)
        loadComments()
    }, [post])

    const loadComments = () => {
        try {
            logic.getAllComments(post.id)
                .then(comments => setComments(comments.reverse()))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

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

                    alert(error.message)
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

    const handleCommentDeleted = (commentId) => setComments(prevComments => prevComments.filter(comment => comment.id !== commentId))

    return <article className='border-b border--b border-gray-500 ml-2 mr-2'>
        <Container className='flex justify-between items-center m-[.5rem]'>
            <Container className='flex items-center gap-1'>
                <Avatar url={post.author.avatar} />
                <Heading className='font-bold text-slate-400 text-lg'>{post.author.username}</Heading>
            </Container>

            {location.pathname !== '/profile' && location.pathname !== '/profile/' && (
                <Button onClick={handleFollowUserClick}>
                    <Image className='w-[20px] h-[20px]' src={isFollowing ? './unfollow.png' : './outlined.png'} />
                </Button>
            )}
        </Container>

        {post.text && (
            <Paragraph className='mt-2 ml-2'>{post.text}</Paragraph>
        )}
        {post.image && (
            <Image className='mt-2' src={post.image} title={post.title} alt={post.alt} />
        )}

        <Time className='mt-2'>{formatTime(new Date(post.date))}</Time>

        <Container className='flex justify-between items-center w-full mb-4'>
            <Container className='flex items-center'>
                <Button onClick={handleLikePostClick} className='flex items-center mr-2'>
                    <Image
                        className='w-[20px] h-[20px] mr-1'
                        src={post.like ? './dislike.png' : './like.png'}
                        alt={(post.like ? 'Dislike' : 'Like') + ' button'}
                    />
                    <span className='text-xs'>
                        {post.likes.length} like{post.likes.length === 1 ? '' : 's'}
                    </span>
                </Button>

                <Button onClick={() => setCommentsVisible(prev => !prev)} className='flex items-center'>
                    <Image src='./commented.png' className='w-[20px] h-[20px]' />
                </Button>
            </Container>

            {post.author.id === logic.getUserId() && (
                <Button onClick={handleDeletePostClick} className='ml-2'>
                    <Image src='./delete.png' className='w-[20px] h-[20px]' />
                </Button>
            )}
        </Container>

        {commentsVisible && (
            <CommentList
                comments={comments}
                onCommentDeleted={handleCommentDeleted}
                postId={post.id}
                onCommentCreated={loadComments}
            />
        )}

        {confirmMessage && <Confirm message={confirmMessage} onAccept={handleDeletePostAccept} onCancel={handleDeletePostCancel} />}
    </article>
}