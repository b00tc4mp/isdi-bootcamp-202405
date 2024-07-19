import logic from '../../logic'
import Button from '../components/Button'

import { Component } from 'react'

import './SaveButton.css'

class SaveButton extends Component {
    constructor(props) {
        super(props)

        const { post } = props

        this.state = {
            saved: post.fav
        }
    }

    handleSave = () => {
        const { post } = this.props

        try {
            logic.toggleSavedPost(post.id, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                this.setState({
                    saved: !this.state.saved
                })

                this.props.onSaveClicked()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        const { post } = newProps

        this.setState({
            saved: post.fav
        })
    }

    render() {
        const flag = this.state.saved ? "Save--active" : "Save--inactive"

        return <Button className="Save--button" onClick={this.handleSave}>
            <div className={flag}></div>
        </Button>
    }
}

export default SaveButton