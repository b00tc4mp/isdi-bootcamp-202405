import logic from '../../logic/index.mjs';

import Button from '../components/Button';

import './LikeButton.css';

function LikeButton({ post, onLikeClicked }) {
    const handleLike = () => {
        try {
            logic.togglePostLike(post.id);

            onLikeClicked();
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const like = post.likes.includes(logic.getUserUsername()) ? 'Like--active' : 'Like--inactive'

    return <Button className="Like--button" onClick={handleLike}>
        <div className={like}></div>
    </Button>
}

export default LikeButton