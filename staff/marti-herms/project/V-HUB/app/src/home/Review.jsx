import Rating from '@mui/material/Rating'


import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

import extractPayloadFromToken from '../../util/extractPayloadFromToken'

export default function Review({ review, onDelete }) {
    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    const handleDelete = () => {
        onDelete(review.id)
    }

    return <Container className='flex flex-row items-center border-y border-solid border-gray-400 px-2'>
        <Container className='flex flex-col w-full h-auto'>
            <Paragraph className='text-xl my-1 ml-1'>{review.author.username}</Paragraph>
            <Paragraph className='text-lg my-1 ml-1'>{review.comment}</Paragraph>
            {review.rate > 0 && <Rating name='read-only' value={review.rate} readOnly />}
        </Container>
        {userId === review.author.id && <Container>
            <button className='bg-white rounded px-1' onClick={handleDelete}>Delete</button>
        </Container>}
    </Container>
}