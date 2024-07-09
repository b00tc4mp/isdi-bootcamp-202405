const { Component } = React

import CreatePost from "./CreatePost"

import Button from "../../components/Button"

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

    handlePostCreated() {
        this.setState({ createPostVisible: false })

        this.props.onPostCreated()
    }

    render() {
        console.debug('Footer -> render')

        return <footer className="footer">
            <Button onClick={this.handleCreatePostClick.bind(this)}>＋</Button>

            {this.state.createPostVisible && <CreatePost onPostCreated={this.handlePostCreated.bind(this)} onCancelCreatePost={this.handleCancelCreatePostClick.bind(this)} />}
        </footer>
    }
}

export default Footer