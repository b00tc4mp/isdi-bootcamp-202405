import logic from '../../../logic/index.mjs'

const { Component } = React

class Footer extends Component {
    constructor() {
        super()
    
        try {
            logic.createPost(postImage, postCaption)

            self.remove(createPost)

            self.onPostCreatedCallback()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
    
    }