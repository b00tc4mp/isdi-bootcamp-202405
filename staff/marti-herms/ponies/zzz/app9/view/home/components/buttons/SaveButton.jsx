import logic from '../../../../logic/index.mjs'

const Component = React.Component;

class SaveButton extends Component {
    constructor(props) {
        super(props);
        const { postId } = props

        this.state = {
            saved: logic.hasPostSaved(postId)
        };
    }

    handleSave = () => {
        const { postId } = this.props

        this.setState({
            saved: !this.state.saved
        });

        logic.toggleSavedPost(postId);

        this.props.onSaveClicked();
    }

    componentWillReceiveProps(newProps) {
        const { postId } = newProps

        this.setState({
            saved: logic.hasPostSaved(postId)
        });
    }

    render() {
        const flag = this.state.saved ? "save-button-active" : "save-button-inactive"

        return <button className="save-button" onClick={this.handleSave}>
            <div className={flag}></div>
        </button>
    }
}

export default SaveButton