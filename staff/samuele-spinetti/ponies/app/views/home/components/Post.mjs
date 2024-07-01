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

        const self = this

        if (post.author.username !== logic.getUserUsername()) {
            const followButton = new Button
            followButton.setClassName('post__button')
            followButton.setText(post.author.following ? 'Unfollow' : 'Follow')
            top.add(followButton)

            followButton.onClick(() => {
                try {
                    logic.toggleFollowUser(post.author.username)

                    self.onFollowUserToggledCallback()
                } catch (error) {
                    console.error(error)

                    alert(error.message)
                }
            })
        }

        const postImage = new Image
        postImage.setClassName('post__image')
        postImage.setUrl(post.image)
        this.add(postImage)

        const sectionLikeSave = new Component(document.createElement('section'))
        sectionLikeSave.setClassName('like-save-field')
        this.add(sectionLikeSave)

        const likeActions = new Component(document.createElement('div'))
        likeActions.setClassName('like__actions')
        sectionLikeSave.add(likeActions)

        const heartButton = new Button
        heartButton.setClassName('heart-button')
        likeActions.add(heartButton)

        const heart = new Image
        heart.setUrl(post.like ? 'https://svgsilh.com/svg/304420-e91e63.svg' : 'https://svgsilh.com/svg/1179072.svg')
        heart.setClassName('heart')
        heartButton.add(heart)

        const countLikes = new Paragraph
        countLikes.setClassName('heart__likes')
        countLikes.setText(post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's'))
        likeActions.add(countLikes)

        const postCaptionText = new Paragraph
        postCaptionText.setClassName('post__caption')
        postCaptionText.setText(post.caption)
        this.add(postCaptionText)

        heartButton.onClick(function () {
            try {
                logic.toggleLikePost(post.id)

                self.onPostLikeToggledCallback()

            } catch (error) {
                console.error(error)

                alert(error.message)

            }
        })

        const toggleFavButton = new Button
        toggleFavButton.setClassName('save-post-button')
        sectionLikeSave.add(toggleFavButton)

        const favIcon = new Image
        favIcon.setUrl(post.fav ? 'https://svgsilh.com/svg/1202757-ff0088.svg' : 'https://svgsilh.com/svg/1202757-c7d5dc.svg')
        favIcon.setClassName('save-icon')
        toggleFavButton.add(favIcon)

        toggleFavButton.onClick(function () {
            try {
                logic.toggleFavPost(post.id)

                self.onPostFavToggledCallback()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        })


        if (post.author.username === logic.getUserUsername()) {
            const postActionButtonsDiv = new Component(document.createElement('div'))
            postActionButtonsDiv.setClassName('post__actions')
            this.add(postActionButtonsDiv)

            const postDeleteButton = new Button
            postDeleteButton.setText('Delete')
            postActionButtonsDiv.add(postDeleteButton)

            postDeleteButton.onClick(() => {
                if (confirm('Delete post?'))
                    try {
                        logic.deletePost(post.id)

                        self.onPostDeletedCallback()
                    } catch (error) {
                        console.error(error)

                        alert(error.message)

                        if (error.message === 'post not found')
                            self.onPostDeletedCallback()
                    }
            })

            const editButton = new Button
            editButton.setText('Edit')
            postActionButtonsDiv.add(editButton)

            let editCaptionForm

            editButton.onClick(() => {

                if (editCaptionForm) return

                editCaptionForm = new Form
                editCaptionForm.setClassName('form-edit-caption')
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

                editCaptionCancelButton.onClick(function () {
                    self.remove(editCaptionForm)

                    editCaptionForm = undefined
                })

                editCaptionForm.onSubmit(event => {
                    event.preventDefault()

                    try {
                        const newCaption = editCaptionInput.getValue()

                        logic.updatePostCaption(post.id, newCaption)

                        self.remove(editCaptionForm)

                        editCaptionForm = undefined

                        self.onPostCaptionEditedCallback()
                    } catch (error) {
                        console.error(error)

                        alert(error.message)

                        if (error.message === 'post not found')
                            self.onPostCaptionEditedCallback()
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

    onFollowUserToggled(callback) {
        this.onFollowUserToggledCallback = callback
    }
}

export default Post
