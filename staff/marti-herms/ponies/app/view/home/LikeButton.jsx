import logic from '../../logic'

import Button from '../library/Button'

export default function LikeButton({ post, onLikeClicked }) {
    const handleLike = () => {
        try {
            logic.togglePostLike(post.id)
                .then(() => onLikeClicked())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const like = post.like ? 'liked' : 'not-liked'

    return <Button className='border-0 p-0 w-6 h-6 bg-transparent box-content' onClick={handleLike}>
        <div className={like}></div>
    </Button>
}