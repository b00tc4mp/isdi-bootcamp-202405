import Component from '../../Component.mjs'
import Heading from '../../components/Heading.mjs'
import Image from '../../components/Image.mjs'
import Paragraph from '../../components/Paragraph.mjs'
import Button from '../../components/Button.mjs'
import Form from '../../components/Form.mjs'
import Label from '../../components/Label.mjs'
import Input from '../../components/Input.mjs'

import logic from '../../../logic/index.mjs'

import formatTime from '../../../utils/formatTime.mjs'

class Post extends Component {
    constructor(post) {
        super(document.createElement('article'))
        this.setClassName('post')

        const postAuthorTitle = new Heading(3)
        postAuthorTitle.setClassName('post__author')
        postAuthorTitle.setText(post.author)
        this.add(postAuthorTitle)

        const postImage = new Image
        postImage.setClassName('post__image')
        postImage.setUrl(post.image)
        this.add(postImage)

        var postCaptionText = new Paragraph
        postCaptionText.setClassName('post__caption')
        postCaptionText.setText(post.caption)
        this.add(postCaptionText)

        const self = this

        const postActionButtons = new Component(document.createElement('div'))
        postActionButtons.setClassName('post__actions')
        this.add(postActionButtons)

        const postToggleLikeButton = new Button
        postToggleLikeButton.setText((post.likes.includes(logic.getUserUsername()) ? '❤️' : '🤍') + ' ' + post.likes.length + 'like' + (post.likes.length === 1 ? '' : 's'))
        postActionButtons.add(postToggleLikeButton)

        postToggleLikeButton.onClick(() => {
            try {
                logic.toggleLikePost(post.id)

                self.onPostLikeToggledCallback()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })

        // const postToggleSaveButton = new Button
        // postToggleSaveButton.setText((post.likes.includes(logic.getUserUsername()) ? '🪅' : '⭐'))
        // postActionButtons.add(postToggleSaveButton)

        // postToggleSaveButton.onClick(() => {
        //     try {
        //         logic.toggleSavePost(post.id)

        //     } catch (error) {
        //         console.error(error)

        //         alert(error.message)
        //     }
        // })


        if (post.author === logic.getUserUsername()) {
            const postDeleteButton = new Button
            postDeleteButton.setClassName('post-delete-button')
            postDeleteButton.setText('Delete')
            postActionButtons.add(postDeleteButton)

            postDeleteButton.onClick(() => {
                if (confirm('Delete post?'))
                    try {
                        logic.deletePost(post.id)

                        // self.clearPosts()
                        // self.listPosts()
                        self.onPostDeletedCallback()
                    } catch (error) {
                        console.error(error)

                        alert(error.message)

                        if (error.message === 'post not found') {
                            // self.clearPosts()
                            // self.listPosts()
                            self.onPostDeletedCallback()
                        }
                    }
            })

            const editButton = new Button
            editButton.setClassName('post-edit-button')
            editButton.setText('Edit')
            postActionButtons.add(editButton)

            editButton.onClick(() => {
                const editCaptionForm = new Form
                self.add(editCaptionForm)

                const editCaptionLabel = new Label
                editCaptionLabel.setFor('edit-caption-input')
                editCaptionForm.add(editCaptionLabel)

                const editCaptionInput = new Input
                editCaptionInput.setId(editCaptionLabel.getFor())
                editCaptionInput.setValue(post.caption)
                editCaptionForm.add(editCaptionInput)

                const editCaptionSubmitButton = new Button
                editCaptionSubmitButton.setType('submit')
                editCaptionSubmitButton.setText('Save')
                editCaptionForm.add(editCaptionSubmitButton)

                const editCaptionCancelButton = new Button
                editCaptionCancelButton.setText('Cancel')
                editCaptionCancelButton.setType('button')
                editCaptionForm.add(editCaptionCancelButton)

                editCaptionCancelButton.onClick(() => self.remove(editCaptionForm))

                editCaptionForm.onSubmit(event => {
                    event.preventDefault()

                    try {
                        const newCaption = editCaptionInput.getValue()

                        logic.updatePostCaption(post.id, newCaption)

                        //self.container.removeChild(editCaptionForm.container)
                        self.remove(editCaptionForm)

                        // self.clearPosts()
                        // self.listPosts()
                        self.onPostCaptionEditedCallback()
                    } catch (error) {
                        console.error(error)

                        alert(error.message)

                        if (error.message === 'post not found') {
                            // self.clearPosts()
                            // self.listPosts()
                            self.onPostCaptionEditedCallback()
                        }
                    }
                })
            })
        }

        const postDateTime = new Component(document.createElement('time'))
        postDateTime.setClassName('post__time')
        postDateTime.setText(formatTime(new Date(post.date)))
        this.add(postDateTime)
    }

    onPostDeleted(callback) {
        this.onPostDeletedCallback = callback
    }

    onPostCaptionEdited(callback) {
        this.onPostCaptionEditedCallback = callback
    }
    onPostLikeToggled(callback) {
        this.onPostLikeToggledCallback = callback
    }
}

export default Post