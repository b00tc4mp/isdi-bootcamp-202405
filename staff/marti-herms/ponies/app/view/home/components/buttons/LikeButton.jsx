import logic from '../../../../logic/index.mjs'

const Component = React.Component;

class LikeButton extends Component {
    constructor(props) {
        super(props);
        const { post } = this.props

        this.state = {
            liked: post.likes.includes(logic.getUserUsername())
        };
    }

    handleLike() {
        const { post } = this.props

        this.setState({
            liked: !this.state.liked
        });

        logic.togglePostLike(post.id);

        this.props.onLikeClicked();
    }

    componentWillReceiveProps(newProps) {
        const { post } = newProps

        this.setState({
            liked: post.likes.includes(logic.getUserUsername())
        });
    }

    render() {
        const like = this.state.liked ? 'like-button-active' : 'like-button-inactive'

        return <button className="like-button" onClick={this.handleLike.bind(this)}>
            <div className={like}></div>
        </button>
    }
}

export default LikeButton