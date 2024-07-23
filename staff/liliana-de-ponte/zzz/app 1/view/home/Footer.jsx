import { Component } from 'react'

import CreatePost from './CreatePost'

import Button from '../components/Button'

import './Footer.css'

class Footer extends Component {
    constructor() {
        console.debug('Footer -> constructor')
        super()

        this.state = { createPostVisible: false }
    }

    handleCreatePostClick() {
        console.debug('Footer -> handleCreatePostClick')

        this.setState({ createPostVisible: true })

    }

    handleCancelCreatePostClick() {
        console.debug('Footer -> handleCancetCreatePostClick')

        this.setState({ createPostVisible: false })
    }

    handlePostCreated() {
        console.debug('Footer -> handlePostCreated')

        this.setState({ createPostVisible: false })

        this.props.onPostCreated()
    }

    render() {
        console.debug('Footer -> render')

        return <footer className="Footer">
            <Button className="Footer--create-post" onClick={this.handleCreatePostClick.bind(this)}>+</Button>

            {this.state.createPostVisible && <CreatePost onPostCreated={this.handlePostCreated.bind(this)} onCancelCreatePost={this.handleCancelCreatePostClick.bind(this)} />}
        </footer >
    }
}

export default Footer
