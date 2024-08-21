import Container from '../library/Container'
import Avatar from './Avatar'
import Heading from '../library/Heading'
import Paragraph from '../library/Paragraph'
import Time from '../library/Time'
import formatTime from '../../util/formatTime.js'

export default function CommentList({ comments }) {
    return <Container>
        {comments.map(comment => <Container
            key={comment.id}
        >
            <Container>
                <Avatar url={comment.author.avatar} />
                <Heading>{comment.author.username}</Heading>
                <Time>{formatTime(new Date(comment.date))}</Time>
            </Container>
            <Paragraph>{comment.text}</Paragraph>
        </Container>)}
    </Container>
}