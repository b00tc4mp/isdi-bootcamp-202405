class Post extends Component {
  constructor(post) {
    super(document.createElement("article"));
    this.setClassName("post");

    const postAuthorTitle = new Heading(3);
    postAuthorTitle.setClassName("post__author");
    postAuthorTitle.setText(post.author);
    this.add(postAuthorTitle);

    const postImage = new Image();
    postImage.setClassName("post__image");
    postImage.setSrc(post.image);
    this.add(postImage);

    const sectionLike = new Component(document.createElement("section"));
    sectionLike.setClassName("like-field");
    this.add(sectionLike);

    const likeButton = new Button();
    likeButton.setClassName("like-button");
    sectionLike.add(likeButton);

    const like = new Image();
    like.setSrc("https://svgsilh.com/svg/1179072.svg");
    like.setClassName("like");
    likeButton.add(like);

    likeButton.onClick(() => {
      try {
        if (usernameIndex === -1) {
          logic.addLike(post.id);
          like.setSrc("https://svgsilh.com/svg/304420-e91e63.svg");
        } else {
          logic.removeLike(post.id);
          like.setSrc("https://svgsilh.com/svg/1179072.svg");
        }
      } catch (error) {
        alert(error.message);
      }
    });

    const postCaptionText = new Paragraph();
    postCaptionText.setClassName("post__caption");
    postCaptionText.setText(post.caption);
    this.add(postCaptionText);

    const self = this;

    if (post.author === logic.getUserUsername()) {
      const postActionButtonsDiv = new Component(document.createElement("div"));
      postActionButtonsDiv.setClassName("post__actions");
      this.add(postActionButtonsDiv);

      const postDeleteButton = new Button();
      postDeleteButton.setText("Delete");
      postDeleteButton.setClassName("delete-button");
      postActionButtonsDiv.add(postDeleteButton);

      postDeleteButton.onClick(() => {
        if (confirm("Delete post?"))
          try {
            logic.deletePost(post.id);
            self.onPostDeletedCallback();
          } catch (error) {
            alert(error.message);

            if (error.message === "post not found") {
              self.onPostDeletedCallback();
            }
          }
      });

      const editButton = new Button();
      editButton.setText("Edit");
      editButton.setClassName("edit-button");
      postActionButtonsDiv.add(editButton);

      postActionButtonsDiv.add(editButton);
      editButton.onClick(function () {
        const editCaptionForm = new Form();
        postActionButtonsDiv.setClassName("form");
        self.add(editCaptionForm);

        const editCaptionLabel = new Label();
        editCaptionLabel.setHtmlFor("edit-caption-input");
        editCaptionForm.add(editCaptionLabel);

        const editCaptionInput = new Input();
        editCaptionInput.setId("edit-caption-input");
        editCaptionInput.setValue(post.caption);
        editCaptionInput.setClassName("form__caption-input");
        editCaptionForm.add(editCaptionInput);

        const editCaptionSubmitButton = new Button();
        editCaptionSubmitButton.setType("submit");
        editCaptionSubmitButton.setText("Save");
        editCaptionSubmitButton.setClassName("save-button");
        editCaptionForm.add(editCaptionSubmitButton);

        const editCaptionCancelButton = new Button();
        editCaptionCancelButton.setText("Cancel");
        editCaptionCancelButton.setType("button");
        editCaptionCancelButton.setClassName("cancel-button");
        editCaptionForm.add(editCaptionCancelButton);

        editCaptionCancelButton.onClick(() => self.remove(editCaptionForm));

        editCaptionForm.onSubmit((event) => {
          event.preventDefault();

          try {
            const newCaption = editCaptionInput.container.value;

            logic.updatePostCaption(post.id, newCaption);
            self.remove(editCaptionForm);

            self.onPostCaptionEditedCallback();
          } catch (error) {
            alert(error.message);

            if (error.message === "post not found") {
              self.onPostCaptionEditedCallback();
            }
          }
        });
      });
    }

    const postDateTime = new Time();
    postDateTime.setClassName("post__time");
    postDateTime.setText(formatTime(new Date(post.date)));
    this.add(postDateTime);
  }

  onPostDeleted(callback) {
    this.onPostDeletedCallback = callback;
  }

  onPostCaptionEdited(callback) {
    this.onPostCaptionEditedCallback = callback;
  }
}
