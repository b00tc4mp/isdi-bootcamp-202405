import Container from '../library/Container'
import Comment from './Comment'
import CreateComment from './CreateComment'

export default function CommentList({ comments, onCommentDeleted, postId, onCommentCreated }) {
    return <Container className='border border-gray-500 rounded-xl mb-[60px] mt-1 overflow-y-auto'>

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