import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

import extractPayloadFromToken from '../../util/extractPayloadFromToken'

export default function Message({ message }) {
    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    return (message.author.id === userId) ?
        <>
            <Paragraph className='text-xs relative top-[25px] self-end mr-5 opacity-50'>{message.author.username}</Paragraph>
            <Container className='max-w-[60%] min-w-[20%] h-auto p-1 rounded-full mt-3 mx-2 bg-blue-800 self-end' >
                <Paragraph>{message.content}</Paragraph>
            </Container>
        </> :
        <>
            <Paragraph className='text-xs relative top-[25px] self-start ml-5 opacity-50'>{message.author.username}</Paragraph>
            <Container className='max-w-[60%] min-w-[20%] h-auto p-1 rounded-full mt-3 mx-2 bg-green-700 self-start' >
                <Paragraph>{message.content}</Paragraph>
            </Container>
        </>
}