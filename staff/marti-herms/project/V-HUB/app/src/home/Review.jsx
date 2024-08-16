import Rating from '@mui/material/Rating'


import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

export default function Review({ review }) {
    return <>
        <Container className='flex flex-col w-full h-auto border-y border-solid border-gray-400 pl-2'>
            <Paragraph className='text-xl my-1 ml-1'>{review.author.username}</Paragraph>
            <Paragraph className='text-lg my-1 ml-1'>{review.comment}</Paragraph>
            {review.rate > 0 && <Rating name='read-only' value={review.rate} readOnly />}
        </Container>
    </>
}