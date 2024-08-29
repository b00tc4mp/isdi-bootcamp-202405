import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

import extractPayloadFromToken from '../../util/extractPayloadFromToken'
import formatTime from '../../util/formatTime'

export default function Message({ message }) {
    const { sub: userId } = extractPayloadFromToken(sessionStorage.token)

    return (message.author.id === userId) ?
        <>
            <Container className='max-w-[60%] min-w-[20%] h-auto p-2 rounded-3xl mt-2 mx-2 bg-blue-500 dark:bg-blue-800 self-end flex flex-row justify-center items-end' >
                <Paragraph className='text-lg text-wrap m-0'>{message.content}</Paragraph>
            </Container>
            <time className='text-xs opacity-60 dark:text-white mr-2 mt-1 self-end'>{formatTime(new Date(message.date))}</time>
        </> :
        <>
            <Container className='max-w-[60%] min-w-[20%] h-auto p-2 rounded-3xl mt-2 mx-2 bg-green-500 dark:bg-green-700 self-start flex flex-row justify-center items-end' >
                <Paragraph className='text-lg text-wrap m-0'>{message.content}</Paragraph>
            </Container>
            <time className='text-xs opacity-60 dark:text-white ml-2 mt-1 self-start'>{formatTime(new Date(message.date))}</time>
        </>
}