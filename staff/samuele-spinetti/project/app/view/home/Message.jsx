import logic from '../../logic'

import formatTime from '../../util/formatTime'

import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

export default function Message({ message }) {

    return <>
        <Container className={`flex p-2 mb-1 rounded-lg max-w-[70%] text-black ${(message.author.id === logic.getUserId()) ? 'bg-green-300 self-end' : 'bg-fuchsia-200 self-start'}`} >
            <Paragraph className="p-1 text-lg">{message.message}</Paragraph>
        </Container>
        <Container className={`${(message.author.id === logic.getUserId()) ? 'self-end' : 'seld-start'} mb-2`}>
            <Paragraph className="text-xs text-gray-400">{formatTime(new Date(message.date))}</Paragraph>
        </Container>
    </>

}