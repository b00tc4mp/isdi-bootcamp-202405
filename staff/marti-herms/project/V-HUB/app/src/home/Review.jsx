import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import { MdDelete as DeleteIcon } from "react-icons/md";

import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

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
            {review.rate > 0 && <Rating
                name='read-only'
                value={review.rate}
                style={{ marginBottom: '12px', marginTop: '6px' }}
                emptyIcon={<StarIcon style={{ opacity: 1, color: 'white' }} fontSize='inherit' />}
                readOnly />}
        </Container>
        {userId === review.author.id && <Container className='mr-3'>
            <Button onClick={handleDelete}><DeleteIcon className='w-7 h-7 dark:text-white' /></Button>
        </Container>}
    </Container>
}