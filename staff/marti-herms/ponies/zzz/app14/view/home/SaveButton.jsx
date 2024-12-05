import logic from '../../logic'
import Button from '../components/Button';

import { Component } from 'react';

import './SaveButton.css';

class SaveButton extends Component {
    constructor(props) {
        super(props);
        const { post } = props

        this.state = {
            saved: post.fav
        };
    }

    handleSave = () => {
        const { post } = this.props

        this.setState({
            saved: !this.state.saved
        });

        logic.toggleSavedPost(post);

        this.props.onSaveClicked();
    }

    componentWillReceiveProps(newProps) {
        const { post } = newProps

        this.setState({
            saved: post.fav
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