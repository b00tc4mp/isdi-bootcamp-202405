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
    }

    render() {
        const flag = this.state.saved ? <div className="save-button-active"></div> : <div className="save-button-inactive"></div>

        return <button className="save-button" onClick={this.handleSave}>{flag}</button>
    }
}

export default SaveButton