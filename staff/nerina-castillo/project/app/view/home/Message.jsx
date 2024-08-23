import formatTime from '../../util/formatTime.js'
import Time from '../library/Time'
import Paragraph from '../library/Paragraph'
import Container from '../library/Container'
import Avatar from './Avatar'

export default function Message({ message }) {
    return <Container>
        <Container>
            <Container>
                <Avatar url={message.author.avatar} />
                <Paragraph>{message.author.username}</Paragraph>
            </Container>
            <Time>{formatTime(new Date(message.date))}</Time>
        </Container>

        {message.text && <Paragraph>{message.text}</Paragraph>}
    </Container>
}