
import Button from "../components/Button"

import CreatePost from "./CreatePost"
import './Footer.css'

import { Component } from 'react'

class Footer extends Component {
    constructor() {
        console.debug('Footer -> constructor')

        super()

        this.state = { createPostVisible: false }  //se inicializa el estado de createPostVisible en false (para que no se muestre)
    }

    handleCreatePostClick() {
        console.debug('Footer -> handleCreatePostClick')

        this.setState({ createPostVisible: true })  //se cambia el estado decreatePostVisible a true (para que se muestre)
    }

    handleCancelCreatePostClick() {
        console.debug('Footer -> handleCancelCreatePostClick')

        this.setState({ createPostVisible: false })  //se cambia el estado de createPostVisible en false (para que deje de mostrarse)
    }

    handlePostCreated() {
        this.setState({ createPostVisible: false })

        this.props.onPostCreated()
    }





    render() {
        console.debug('Footer -> render')

        return <footer className="Footer">
            <Button className="Button--add" onClick={this.handleCreatePostClick.bind(this)}>+</Button>

            {this.state.createPostVisible && <CreatePost
                onPostCreated={this.handlePostCreated.bind(this)}
                onCancelCreatePost={this.handleCancelCreatePostClick.bind(this)} />}

        </footer>

    }
}


export default Footer