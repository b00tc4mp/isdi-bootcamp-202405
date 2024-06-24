class Footer extends Component {
    constructor() {
        super(document.createElement('footer'))

        this.container.className = 'footer'

        var addPostButton = new Button
        addPostButton.setClassName('add-post-button')
        addPostButton.setText('+')
        this.add(addPostButton)

        var createPostSection = new Section
        createPostSection.setClassName('create-post-section')
        this.add(createPostSection)

        addPostButton.onClick(function () {
            var createPostSection = new Section

            var createPostTitle = new H2
            createPostTitle.setClassName('create-post-section__title')
            createPostTitle.setText('Create Post')
            createPostSection.add(createPostTitle)

            var createPostForm = new Form
            createPostForm.setClassName('form')
            createPostSection.add(createPostForm)


            createPostForm.onSubmit(function (event) {
                event.preventDefault()

                //var postImageInput = document.getElementById('post-image-input')
                var postImage = postImageInput.value
                var postCaption = postCaptionInput.value

                try {
                    createPost(postImage, postCaption)

                    this.removeChild(createPostSection)

                    clearPosts()
                    listPosts()
                } catch (error) {
                    alert(error.message)
                }
            })


            var postImageFieldDiv = new Div
            postImageFieldDiv.setClassName('form__fied')
            createPostForm.add(postImageFieldDiv)

            var postImageLabel = new Label
            postImageLabel.htmlFor = 'post-image-input'
            postImageLabel.setText('Image')
            postImageFieldDiv.add(postImageLabel)

            var postImageInput = new Input
            postImageInput.setClassName('form__input')
            postImageInput.setId('post-image-input')
            postImageFieldDiv.add(postImageInput)

            var postCaptionFieldDiv = new Div
            postCaptionFieldDiv.setClassName('form__field')
            createPostForm.add(postCaptionFieldDiv)

            var postCaptionLabel = new Label
            postCaptionLabel.htmlFor = 'post-caption-input'
            postCaptionLabel.setText('Caption')
            postCaptionFieldDiv.add(postCaptionLabel)

            var postCaptionInput = new Input
            postCaptionInput.setClassName('form__input')
            postCaptionInput.setId('post-caption-input')
            postCaptionFieldDiv.add(postCaptionInput)

            var postButtonsDiv = new Div
            postButtonsDiv.setClassName('create-post-section__buttons')
            createPostForm.add(postButtonsDiv)

            var postSubmitButton = new Button
            postSubmitButton.setClassName('form__button')
            postSubmitButton.type = 'submit'
            postSubmitButton.setText('Create')
            postButtonsDiv.add(postSubmitButton)

            var postCancelButton = new Button
            postCancelButton.setClassName('form__button')
            postCancelButton.type = 'reset'
            postCancelButton.setText('Cancel')
            postButtonsDiv.add(postCancelButton)

            postCancelButton.onClick(function () {
                this.removeChild(createPostSection)
            })
        })

    }

}
