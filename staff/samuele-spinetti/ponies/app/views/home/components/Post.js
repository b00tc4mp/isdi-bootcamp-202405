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

        const sectionLike = new Component(document.createElement('section'))
        sectionLike.setClassName('like-field')
        this.add(sectionLike)

        const heartButton = new Button
        heartButton.setClassName('heart-button')
        sectionLike.add(heartButton)

        const heart = new Image
        if (post.likeUsers.includes(logic.getUserUsername()))
            heart.setUrl('https://svgsilh.com/svg/304420-e91e63.svg')
        else
            heart.setUrl('https://svgsilh.com/svg/1179072.svg')
        heart.setClassName('heart')
        heartButton.add(heart)

        const countLikes = new Paragraph
        countLikes.setClassName('heart__likes')
        countLikes.setText(post.likeUsers.length + ' like' + (post.likeUsers.length === 1 ? '' : 's'))
        sectionLike.add(countLikes)

        const postCaptionText = new Paragraph
        postCaptionText.setClassName('post__caption')
        postCaptionText.setText(post.caption)
        this.add(postCaptionText)

        const self = this

        heartButton.onClick(function () {
            try {

                logic.toggleLikePost(post.id)

                self.onPostLikeToggledCallback()

            } catch (error) {
                alert(error.message)

            }
        })

        if (post.author === logic.getUserUsername()) {
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

                        // self.clearPosts()
                        // self.listPosts()
                        self.onPostDeletedCallback()
                    } catch (error) {
                        alert(error.message)

                        if (error.message === 'post not found') {
                            // self.clearPosts()
                            // self.listPosts()
                            self.onPostDeletedCallback()
                        }
                    }
            })

            const editButton = new Button
            editButton.setText('Edit')
            postActionButtonsDiv.add(editButton)

            editButton.onClick(() => {
                const editCaptionForm = new Form
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
                })

                editCaptionForm.onSubmit(event => {
                    event.preventDefault()

                    try {
                        const newCaption = editCaptionInput.getValue()

                        logic.updatePostCaption(post.id, newCaption)

                        //self.container.removechild(editCaptionForm.container)
                        self.remove(editCaptionForm)

                        // self.clearPosts()
                        // self.listPosts()
                        self.onPostCaptionEditedCallback()
                    } catch (error) {
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
