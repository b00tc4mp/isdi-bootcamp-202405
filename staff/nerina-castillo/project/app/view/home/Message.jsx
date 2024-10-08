import formatTime from '../../util/formatTime.js'
import Time from '../library/Time'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import Avatar from './Avatar'

export default function Message({ message, userId }) {
    const isCurrentUser = message.author.id === userId

    return <Container className={`p-2 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
        <Container className={`flex items-center ${isCurrentUser ? 'flex-row-reverse text-right' : 'text-left'}`}>
            <Container>
                <Avatar url={message.author.avatar} className={`${isCurrentUser ? 'ml-2' : 'mr-2'}`} />
                <Paragraph>{message.author.username}</Paragraph>
            </Container>
            <Time>{formatTime(new Date(message.date))}</Time>
        </Container>

        {message.text && <Paragraph className={`mt-2 ${isCurrentUser ? 'text-right' : 'text-left'}`}>{message.text}</Paragraph>}
    </Container>
}