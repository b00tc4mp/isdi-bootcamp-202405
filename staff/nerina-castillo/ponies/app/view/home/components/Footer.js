class Footer extends Component {
  constructor() {
    super(document.createElement("footer"));
    this.setClassName("footer");

    const self = this;

    const addPostButton = new Button();
    addPostButton.setClassName("add-post-button");
    addPostButton.setText("+");
    this.add(addPostButton);

    addPostButton.onClick(function () {
      const createPostSection = new Component(
        document.createElement("section")
      );
      createPostSection.setClassName("create-post-section");
      self.add(createPostSection);

      const createPostTitle = new Heading(2);
      createPostTitle.setClassName("create-post-section__title");
      createPostTitle.setText("Create Post");
      createPostSection.add(createPostTitle);

      const createPostForm = new Form();
      createPostForm.setClassName("form");
      createPostSection.add(createPostForm);

      createPostForm.onSubmit(function (event) {
        event.preventDefault();
        const postImageInput = document.getElementById("post-image-input");
        const postCaptionInput = document.getElementById("post-caption-input");

        const postImage = postImageInput.value;
        const postCaption = postCaptionInput.value;

        try {
          logic.createPost(postImage, postCaption);

          self.remove(createPostSection);
          self.onPostCreatedCallback();
        } catch (error) {
          alert(error.message);
        }
      });

      const postImageFieldDiv = new Component(document.createElement("div"));
      postImageFieldDiv.setClassName("form__field");
      createPostForm.add(postImageFieldDiv);

      const postImageLabel = new Label();
      postImageLabel.setHtmlFor("post-image-input");
      postImageLabel.setText("Image");
      createPostForm.add(postImageLabel);

      const postImageInput = new Input();
      postImageInput.setClassName("form__input");
      postImageInput.setId("post-image-input");
      createPostForm.add(postImageInput);

      const postCaptionFieldDiv = new Component(document.createElement("div"));
      postCaptionFieldDiv.setClassName("form__field");
      createPostForm.add(postCaptionFieldDiv);

      const postCaptionLabel = new Label();
      postCaptionLabel.setHtmlFor("post-caption-input");
      postCaptionLabel.setText("Caption");
      createPostForm.add(postCaptionLabel);

      const postCaptionInput = new Input();
      postCaptionInput.setClassName("form__caption-input");
      postCaptionInput.setId("post-caption-input");
      createPostForm.add(postCaptionInput);

      const postButtonsDiv = new Component(document.createElement("div"));
      postButtonsDiv.setClassName("create-post-section__buttons");
      createPostForm.add(postButtonsDiv);

      const postSubmitButton = new Button();
      postSubmitButton.setClassName("form__button");
      postSubmitButton.setType("submit");
      postSubmitButton.setText("Create");
      createPostForm.add(postSubmitButton);

      const postCancelButton = new Button();
      postCancelButton.setClassName("form__button");
      postCancelButton.setType("reset");
      postCancelButton.setText("Cancel");
      createPostForm.add(postCancelButton);

      postCancelButton.onClick(function () {
        self.remove(createPostSection);
      });
    });
  }
  onPostCreated(callback) {
    this.onPostCreatedCallback = callback;
  }
}
