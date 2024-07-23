import { Component } from 'react'

import CreatePost from './CreatePost'
import Button from '../components/Button'
import Image from '../components/Image'
import Container from '../components/Container'

class Footer extends Component {
    constructor() {
        super()

        this.state = { createPostVisible: false }
    }

    handleCreatePostClick() {
        this.setState({ createPostVisible: true })
    }

    handleCancelCreatePostClick() {
        this.setState({ createPostVisible: false })
    }

    handlePostCreated() {
        this.setState({ createPostVisible: false })

        this.props.onPostCreated()
    }

    render() {
        return <footer className="footer">

            <Button className={"add-post-button"} onClick={this.handleCreatePostClick.bind(this)}>
                <Image className={"add-post-button__icon"} src={"https://svgsilh.com/svg/1721865.svg"} />
            </Button>

            <Button className={"chat-button"}>
                <Image className={"chat-button__icon"} src={"https://svgsilh.com/svg/1294839.svg"} />
            </Button>

            {this.state.createPostVisible && <CreatePost onPostCreated={this.handlePostCreated.bind(this)} onCancelCreatePost={this.handleCancelCreatePostClick.bind(this)} />}
        </footer >
    }
}

export default Footer