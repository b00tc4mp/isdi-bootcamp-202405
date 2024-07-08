import logic from '../../../../logic/index.mjs'

const Component = React.Component;

class LikeButton extends Component {
    constructor() {
        super();
    }

    handleLike() {
        const { post } = this.props

        logic.togglePostLike(post.id);

        this.props.onLikeClicked();
    }

    render() {
        const like = this.props.post.likes.includes(logic.getUserUsername()) ? 'like-button-active' : 'like-button-inactive'

        return <button className="like-button" onClick={this.handleLike.bind(this)}>
            <div className={like}></div>
        </button>
    }
}

export default LikeButton