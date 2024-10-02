import logic from '../../logic'

import formatTime from '../../util/formatTime'

import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

export default function Message({ message }) {

    return <>
        <Container
            className={`rounded-lg mt-4 text-black ${(message.author.id === logic.getUserId()) ? 'bg-cyan-600 self-end' : 'bg-orange-300 self-start'}`} >

            <Paragraph
                className="text-sm">{message.message}
            </Paragraph>
        </Container>

        <Container
            className={`${(message.author.id === logic.getUserId()) ? 'self-end' : 'seld-start'} p-0 -mr-3 -ml-3`}>
            <Paragraph
                className="-mt-1 text-xs text-gray-400">{formatTime(new Date(message.date))}
            </Paragraph>
        </Container>
    </>

}