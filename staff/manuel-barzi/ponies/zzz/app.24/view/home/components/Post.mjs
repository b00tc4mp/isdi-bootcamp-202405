import Component from '../../Component.mjs'
import Heading from '../../components/Heading.mjs'
import Image from '../../components/Image.mjs'
import Paragraph from '../../components/Paragraph.mjs'
import Button from '../../components/Button.mjs'
import Form from '../../components/Form.mjs'
import Label from '../../components/Label.mjs'
import Input from '../../components/Input.mjs'

import logic from '../../../logic/index.mjs'

import formatTime from '../../../util/formatTime.mjs'

class Post extends Component {
    constructor(post) {
        super(document.createElement('article'))
        this.setClassName('post')

        const top = new Component(document.createElement('div'))
        top.setClassName('post__top')
        this.add(top)

        const postAuthorTitle = new Heading(3)
        postAuthorTitle.setClassName('post__author')
        postAuthorTitle.setText(post.author.username)
        top.add(postAuthorTitle)

        const followButton = new Button
        followButton.setText(post.author.following ? '🦄' : '🐴')
        top.add(followButton)

        followButton.onClick(() => {
            try {
                logic.toggleFollowUser(post.author.username) // { username: ..., following: true | false }

                this.onUserFollowToggledCallback()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })

        const postImage = new Image
        postImage.setClassName('post__image')
        postImage.setUrl(post.image)
        this.add(postImage)

        const postCaptionText = new Paragraph
        postCaptionText.setClassName('post__caption')
        postCaptionText.setText(post.caption)
        this.add(postCaptionText)

        const postActionButtons = new Component(document.createElement('div'))
        postActionButtons.setClassName('post__actions')
        this.add(postActionButtons)

        const postToggleLikeButton = new Button
        postToggleLikeButton.setText((post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's'))
        postActionButtons.add(postToggleLikeButton)

        postToggleLikeButton.onClick(() => {
            try {
                logic.toggleLikePost(post.id)

                this.onPostLikeToggledCallback()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })

        const postToggleFavButton = new Button
        postToggleFavButton.setText(post.fav ? '🏳️‍🌈' : '🏳️')
        postActionButtons.add(postToggleFavButton)

        postToggleFavButton.onClick(() => {
            try {
                logic.toggleFavPost(post.id)

                this.onPostFavToggledCallback()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })

        if (post.author.username === logic.getUserUsername()) {
            const postDeleteButton = new Button
            postDeleteButton.setText('🗑️')
            postActionButtons.add(postDeleteButton)

            postDeleteButton.onClick(() => {
                if (confirm('Delete post?'))
                    try {
                        logic.deletePost(post.id)

                        // this.clearPosts()
                        // this.listPosts()
                        this.onPostDeletedCallback()
                    } catch (error) {
                        console.error(error)

                        alert(error.message)

                        if (error.message === 'post not found') {
                            // this.clearPosts()
                            // this.listPosts()
                            this.onPostDeletedCallback()
                        }
                    }
            })

            const editButton = new Button
            editButton.setText('📝')
            postActionButtons.add(editButton)

            let editCaptionForm

            editButton.onClick(() => {
                //if (editCaptionForm && this.has(editCaptionForm)) return
                if (editCaptionForm) return

                editCaptionForm = new Form
                this.add(editCaptionForm)

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

                // editCaptionCancelButton.onClick(() => this.remove(editCaptionForm))
                editCaptionCancelButton.onClick(() => {
                    this.remove(editCaptionForm)

                    editCaptionForm = undefined
                })

                editCaptionForm.onSubmit(event => {
                    event.preventDefault()

                    try {
                        const newCaption = editCaptionInput.getValue()

                        logic.updatePostCaption(post.id, newCaption)

                        this.remove(editCaptionForm)

                        editCaptionForm = undefined

                        this.onPostCaptionEditedCallback()
                    } catch (error) {
                        console.error(error)

                        alert(error.message)

                        if (error.message === 'post not found')
                            this.onPostCaptionEditedCallback()
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

    onPostFavToggled(callback) {
        this.onPostFavToggledCallback = callback
    }

    onUserFollowToggled(callback) {
        this.onUserFollowToggledCallback = callback
    }
}

export default Post