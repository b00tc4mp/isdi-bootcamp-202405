import { Component } from 'react'

import CreatePost from './CreatePost'
import Button from '../../components/Button'


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
        console.debug('Footer -> handleCancelCreatePostClick')

        this.setState({ createPostVisible: false })
    }

    handleCreatePostSubmit(event) {
        console.debug('Footer -> handleCreatePostSubmit')

        event.preventDefault()

        const form = event.target

        const postImageInput = form['post-image-input']
        const postCaptionInput = form['post-caption-input']

        const postImage = postImageInput.value
        const postCaption = postCaptionInput.value

        try {
            logic.createPost(postImage, postCaption)

            this.setState({ createPostVisible: false })

            this.props.onPostCreated()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('Footer -> render')

        return <footer className="footer">
            <Button className="button--create-post"
                onClick={this.handleCreatePostClick.bind(this)}>＋</Button>

            {this.state.createPostVisible && <CreatePost
                onPostCreated={this.handleCreatePostClick.bind(this)}
                onCancelCreatePost={this.handleCancelCreatePostClick.bind(this)}
            />}

        </footer >
    }
}

export default Footer