class PostList extends Component {
    constructor() {
        super(document.createElement('section'))

        this.setClassName('post-list')


    }

    clearPosts() {
        for (let i = this.container.children.length - 1; i > -1; i--) {
            const child = this.container.children[i]

            this.container.removeChild(child)
        }
    }

    listPosts() {
        try {
            const posts = getAllPosts()

            const self = this

            posts.forEach(function (post) {
                const postArticle = document.createElement('article')
                postArticle.className = 'post'
                self.container.appendChild(postArticle)

                const postAuthorTitle = document.createElement('h3')
                postAuthorTitle.className = 'post__author'
                postAuthorTitle.innerText = post.author
                postArticle.appendChild(postAuthorTitle)

                const postImage = document.createElement('img')
                postImage.className = 'post__image'
                postImage.src = post.image
                postArticle.appendChild(postImage)

                const postCaptionText = document.createElement('p')
                postCaptionText.className = 'post__caption'
                postCaptionText.innerText = post.caption
                postArticle.appendChild(postCaptionText)

                if (post.author === getUserUsername()) {
                    const postActionButtonsDiv = document.createElement('div')
                    postActionButtonsDiv.className = 'post__actions'
                    postArticle.appendChild(postActionButtonsDiv)

                    const postDeleteButton = document.createElement('button')
                    postDeleteButton.innerText = 'Delete'
                    postActionButtonsDiv.appendChild(postDeleteButton)

                    postDeleteButton.onclick = function () {
                        if (confirm('Delete post?'))
                            try {
                                deletePost(post.id)

                                self.clearPosts()
                                self.listPosts()
                            } catch (error) {
                                alert(error.message)

                                if (error.message === 'post not found') {
                                    self.clearPosts()
                                    self.listPosts()
                                }
                            }
                    }

                    const editButton = document.createElement('button')
                    editButton.innerText = 'Edit'
                    postActionButtonsDiv.appendChild(editButton)

                    editButton.onclick = function () {

                        const editCaptionForm = document.createElement('form')
                        postArticle.appendChild(editCaptionForm)

                        const editCaptionLabel = document.createElement('label')
                        editCaptionLabel.htmlFor = 'edit-caption-input'
                        editCaptionForm.appendChild(editCaptionLabel)

                        const editCaptionInput = document.createElement('input')
                        editCaptionInput.id = editCaptionLabel.htmlFor
                        editCaptionInput.value = post.caption
                        editCaptionForm.appendChild(editCaptionInput)

                        const editCaptionSubmitButton = document.createElement('button')
                        editCaptionSubmitButton.type = 'submit'
                        editCaptionSubmitButton.innerText = 'Save'
                        editCaptionForm.appendChild(editCaptionSubmitButton)

                        const editCaptionCancelButton = document.createElement('button')
                        editCaptionCancelButton.innerText = 'Cancel'
                        editCaptionCancelButton.type = 'button'
                        editCaptionForm.appendChild(editCaptionCancelButton)

                        editCaptionCancelButton.onclick = function () {
                            postArticle.removeChild(editCaptionForm)
                        }

                        editCaptionForm.onsubmit = function (event) {
                            event.preventDefault()

                            try {
                                const newCaption = editCaptionInput.value

                                updatePostCaption(post.id, newCaption)

                                postArticle.removeChild(editCaptionForm)

                                self.clearPosts()
                                self.listPosts()
                            } catch (error) {
                                alert(error.message)

                                if (error.message === 'post not found') {
                                    self.clearPosts()
                                    self.listPosts()
                                }
                            }
                        }
                    }
                }

                const postDateTime = document.createElement('time')
                postDateTime.className = 'post__time'
                postDateTime.innerText = formatTime(new Date(post.date))
                postArticle.appendChild(postDateTime)
            })
        } catch (error) {
            alert(error.message)
        }
    }
}