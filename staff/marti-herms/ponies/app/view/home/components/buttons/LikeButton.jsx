import logic from '../../../../logic/index.mjs'

const Component = React.Component;

class LikeButton extends Component {
    constructor(props) {
        super(props);
        const { postId } = props

        this.state = {
            liked: logic.hasLikedPost(postId)
        };
    }

    handleLike = () => {
        const { postId } = this.props

        this.setState({
            liked: !this.state.liked
        });

        logic.togglePostLike(postId);
    }

    render() {
        const heart = this.state.liked ? <div className="like-button-active"></div> : <div className="like-button-inactive"></div>

        return <button className="like-button" onClick={this.handleLike}>{heart}</button>
    }
}

export default LikeButton