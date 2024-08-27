import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

import extractPayloadFromToken from '../../util/extractPayloadFromToken'
import formatTime from '../../util/formatTime'

export default function Message({ message }) {
    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    return (message.author.id === userId) ?
        <>
            <Container className='max-w-[60%] min-w-[20%] h-auto p-3 rounded-3xl mt-2 mx-2 bg-blue-800 self-end flex flex-col justify-center items-end' >
                <Paragraph className='text-lg text-wrap m-0'>{message.content}</Paragraph>
                <time className='text-xs opacity-50 text-white mr-1'>{formatTime(new Date(message.date))}</time>
            </Container>
        </> :
        <>
            <Container className='max-w-[60%] min-w-[20%] h-auto p-3 rounded-3xl mt-2 mx-2 bg-green-700 self-start flex flex-col justify-center items-start' >
                <Paragraph className='text-lg text-wrap m-0'>{message.content}</Paragraph>
                <time className='text-xs opacity-50 text-white ml-1'>{formatTime(new Date(message.date))}</time>
            </Container>
        </>
}