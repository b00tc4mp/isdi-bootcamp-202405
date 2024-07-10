import logic from '../../../../logic/index.mjs'
import Button from '../../../components/Button';

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
        const flag = this.state.saved ? "Save--active" : "Save--inactive"

        return <Button className="Save--button" onClick={this.handleSave}>
            <div className={flag}></div>
        </Button>
    }
}

export default SaveButton