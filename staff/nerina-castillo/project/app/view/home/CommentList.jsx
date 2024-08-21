import Container from '../library/Container'
import Comment from './Comment'
import CreateComment from './CreateComment'

export default function CommentList({ comments, onCommentDeleted, postId, onCommentCreated }) {
    return <Container className='border border-gray-500 rounded-xl mb-2 mt-1'>
        <CreateComment postId={postId} onCommentCreated={onCommentCreated} />
        {comments.map(comment => (
            <Comment
                key={comment.id}
                comment={comment}
                onCommentDeleted={onCommentDeleted}
            />
        ))}
    </Container>

}