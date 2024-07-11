import CreatePost from "./CreatePost"
import Button from "../components/Button"

import { Component } from 'react'

import './Footer.css'
class Footer extends Component {
    constructor() {
        super()

        this.state = {
            isFormOpen: false
        }
    }

    handleCreatePostClick() {
        this.setState({ isFormOpen: true })
    }

    handleCancelCreatePostClick() {
        this.setState({ isFormOpen: false })
    }

    handlePostCreated() {
        this.setState({ isFormOpen: false })

        this.props.onPostCreated()
    }

    render() {
        return <footer className="footer">
            <Button onClick={this.handleCreatePostClick.bind(this)}>+</Button>

            {this.state.isFormOpen && <CreatePost onPostCreated={this.handlePostCreated.bind(this)} onCancelCreatePost={this.handleCancelCreatePostClick.bind(this)} />}

        </footer>
    }
}

export default Footer