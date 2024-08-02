import logic from '../../logic'

import Button from '../components/Button'

import './LikeButton.css'

const LikeButton = ({ post, onLikeClicked }) => {
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

    const like = post.like ? 'Like--active' : 'Like--inactive'

    return <Button className="Like--button" onClick={handleLike}>
        <div className={like}></div>
    </Button>
}

export default LikeButton