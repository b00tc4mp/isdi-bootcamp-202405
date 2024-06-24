class Main extends Component {
    constructor() {
        super(document.createElement('header'))

        this.container.className = "view main"

        var postListSection = new Section
        postListSection.setClassName('post-list')
        this.add(postListSection)

        function clearPosts() {
            for (var i = postListSection.children.length - 1; i > -1; i--) {
                var child = postListSection.children[i]

                postListSection.removeChild(child)
            }
        }

        function listPosts() {
            try {
                var posts = getAllPosts()

                posts.forEach(function (post) {
                    var postArticle = new Article
                    postArticle.setClassName('post')
                    postListSection.add(postArticle)

                    var postAuthorTitle = new H3
                    postAuthorTitle.setClassName('post__author')
                    postAuthorTitle.setText(post.author)
                    postArticle.add(postAuthorTitle)

                    var postImage = new Image
                    postImage.setClassName('post__image')
                    postImage.src = post.image
                    postArticle.add(postImage)

                    var postCaptionText = new Paragraph
                    postCaptionText.setClassName('post__caption')
                    postCaptionText.setText(post.caption)
                    postArticle.add(postCaptionText)

                    if (post.author === getUserUsername()) {
                        var postActionButtonsDiv = new Div
                        postActionButtonsDiv.setClassName('post__actions')
                        postArticle.add(postActionButtonsDiv)

                        var postDeleteButton = new Button
                        postDeleteButton.setText('Delete')
                        postActionButtonsDiv.add(postDeleteButton)

                        postDeleteButton.onClick(function () {
                            if (confirm('Delete post?'))
                                try {
                                    deletePost(post.id)

                                    clearPosts()
                                    listPosts()
                                } catch (error) {
                                    alert(error.message)

                                    if (error.message === 'post not found') {
                                        clearPosts()
                                        listPosts()
                                    }
                                }
                        })

                        var editButton = new Button
                        editButton.setText('Edit')
                        postActionButtonsDiv.add(editButton)

                        editButton.onClick(function () {

                            var editCaptionForm = new Form
                            postArticle.add(editCaptionForm)

                            var editCaptionLabel = new Label
                            editCaptionLabel.htmlFor = 'edit-caption-input'
                            editCaptionForm.add(editCaptionLabel)

                            var editCaptionInput = new Input
                            editCaptionInput.setId('edit-caption-input')
                            editCaptionInput.value = post.caption
                            editCaptionForm.add(editCaptionInput)

                            var editCaptionSubmitButton = new Button
                            editCaptionSubmitButton.type = 'submit'
                            editCaptionSubmitButton.setText('Save')
                            editCaptionForm.add(editCaptionSubmitButton)

                            var editCaptionCancelButton = new Button
                            editCaptionCancelButton.setText('Cancel')
                            editCaptionCancelButton.type = 'button'
                            editCaptionForm.add(editCaptionCancelButton)

                            editCaptionCancelButton.onClick(function () {
                                postArticle.removeChild(editCaptionForm)
                            })

                            editCaptionForm.onSubmit(function (event) {
                                event.preventDefault()

                                try {
                                    var newCaption = editCaptionInput.value

                                    updatePostCaption(post.id, newCaption)

                                    postArticle.removeChild(editCaptionForm)

                                    clearPosts()
                                    listPosts()
                                } catch (error) {
                                    alert(error.message)

                                    if (error.message === 'post not found') {
                                        clearPosts()
                                        listPosts()
                                    }
                                }
                            })
                        })
                    }

                    var postDateTime = new Time
                    postDateTime.setClassName('post__time')
                    postDateTime.setText(formatTime(new Date(post.date)))
                    postArticle.add(postDateTime)
                })
            } catch (error) {
                alert(error.message)
            }
        }

        listPosts()

    }

}