import Component from '../../Component.js'
import Button from '../../components/Button.js'
import Heading from '../../components/Heading.js'
import Label from '../../components/Label.js'
import Form from '../../components/Form.js'
import Input from '../../components/Input.js'

import logic from '../../../logic'

class Footer extends Component {
    constructor() {
        super(document.createElement('footer'))
        this.setClassName('footer')

        const addPostButton = new Button
        addPostButton.setClassName('add-post-button')
        addPostButton.setText('+')
        this.add(addPostButton)

        addPostButton.onClick(() => {
            const createPost = new Component(document.createElement('section'))
            createPost.setClassName('create-post-section')
            this.add(createPost)

            const createPostTitle = new Heading(2)
            createPostTitle.setClassName('create-post-section__title')
            createPostTitle.setText('Create Post')
            createPost.add(createPostTitle)

            const createPostForm = new Form
            createPostForm.setClassName('form')
            createPost.add(createPostForm)

            createPostForm.onSubmit(event => {
                event.preventDefault()

                // const postImageInput = document.getElementById('post-image-input')
                const postImage = postImageInput.getValue()
                const postCaption = postCaptionInput.getValue()

                try {
                    logic.createPost(postImage, postCaption)

                    this.remove(createPost)

                    //this.clearPost()
                    //this.listPosts()
                    this.onPostCreatedCallback()
                } catch (error) {
                    console.error(error)

                    alert(error.message)

                }
            })

            const postImageField = new Component(document.createElement('div'))
            postImageField.setClassName('form__field')
            createPostForm.add(postImageField)

            const postImageLabel = new Label
            postImageLabel.setFor('post-image-input')
            postImageLabel.setText('Image')
            postImageField.add(postImageLabel)

            const postImageInput = new Input
            postImageInput.setClassName('form__input')
            postImageInput.setId(postImageLabel.getFor())
            postImageField.add(postImageInput)

            const postCaptionField = new Component(document.createElement('div'))
            postCaptionField.setClassName('form__field')
            createPostForm.add(postCaptionField)

            const postCaptionLabel = new Label
            postCaptionLabel.setFor('post-caption-input')
            postCaptionLabel.setText('Caption')
            postCaptionField.add(postCaptionLabel)

            const postCaptionInput = new Input
            postCaptionInput.setClassName('form__input')
            postCaptionInput.setId(postCaptionLabel.getFor())
            postCaptionField.add(postCaptionInput)

            const postButtons = new Component(document.createElement('div'))
            postButtons.setClassName('create-post-section__buttons')
            createPostForm.add(postButtons)

            const postSubmitButton = new Button
            postSubmitButton.setClassName('form__button')
            postSubmitButton.setType('submit')
            postSubmitButton.setText('Create')
            postButtons.add(postSubmitButton)

            const postCancelButton = new Button
            postCancelButton.setClassName('form__button')
            postCancelButton.setText('Cancel')
            postCancelButton.setType('reset')
            postButtons.add(postCancelButton)

            postCancelButton.onClick(() => this.remove(createPost))
        })
    }

    onPostCreated(callback) {
        this.onPostCreatedCallback = callback
    }
}

export default Footer