import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

export default function Review({ review }) {
    return <>
        <Container className='flex flex-col w-full h-auto border-y border-solid border-gray-400'>
            <Paragraph>{review.author.username}</Paragraph>
            <Paragraph>{review.comment}</Paragraph>
        </Container>
    </>
}