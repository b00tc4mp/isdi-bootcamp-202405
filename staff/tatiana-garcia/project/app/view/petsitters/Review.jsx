import Rating from '@mui/material/Rating'
import { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import { MdDelete as DeleteIcon } from 'react-icons/md'

import Container from '../library/Container'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'
import Image from '../library/Image'

import extractPayloadFromToken from '../../util/extractPayLoadFromToken'
import isUserLoggedIn from '../../logic/isUserLoggedIn'

export default function Review({ review, onDelete }) {
    const [deleteVisibility, setDeleteVisibility] = useState(false)

    useEffect(() => {
        if (isUserLoggedIn()) {
            const { sub: userId } = extractPayloadFromToken(sessionStorage.token)
            if (userId === review.author.id) {
                setDeleteVisibility(true)
            }
        }
    }, [])

    const handlePetsitterDelete = () => {
        onDelete(review.id)
    }

    return <Container className='flex flex-row items-center border-y border-solid border-gray-400 px-0'>
        <Container className='flex flex-row w-full h-auto'>
            <Image src={review.author.image} alt='imagen usuario' className='h-20 w-20 rounded-[15px] p-2 m-1' />
            <Container className='flex flex-col'>
                <Paragraph className='text-sm  ml-0 font-bold'>{review.author.name}</Paragraph>
                <Paragraph className='text-sm mt-0 ml-0'>{review.comment}</Paragraph>
                {review.rate > 0 && <Rating
                    name='read-only'
                    value={review.rate}
                    style={{ marginBottom: '12px', marginTop: '6px' }}
                    size='small'
                    emptyIcon={<StarIcon style={{ opacity: 1, color: 'white' }} fontSize='inherit' />}
                    readOnly />}
            </Container>
        </Container>
        {deleteVisibility && <Container className='mr-1'>
            <Button onClick={handlePetsitterDelete}><DeleteIcon className='w-6 h-6 text-slate-800' /></Button>
        </Container>}
    </Container>
}