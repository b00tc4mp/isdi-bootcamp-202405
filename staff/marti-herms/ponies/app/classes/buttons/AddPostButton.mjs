import Button from '../Button.mjs';
import Component from '../Component.mjs';
import Fader from '../Fader.mjs';
import Field from '../Field.mjs';
import Form from '../Form.mjs';
import Input from '../Input.mjs';
import Label from '../Label.mjs';
import Paragraph from '../Paragraph.mjs';

import logic from '../../logic/index.mjs';

class AddPostButton extends Button {
    constructor() {
        super();
    }

    onClick(buttonBox) {
        this.container.onclick = (event) => {
            event.stopPropagation();

            const home = new Component(document.body);

            const fader = new Fader();
            fader.setDisplay('flex');
            home.add(fader);

            const createPostSection = new Component(document.createElement('section'));
            createPostSection.setClassName('newposts');
            fader.add(createPostSection);

            const createPostTitle = new Paragraph('h2');
            createPostTitle.setText('Create Post');
            createPostSection.add(createPostTitle);

            const createPostForm = new Form('form');
            createPostSection.add(createPostForm);

            createPostForm.onSubmit((event) => {
                event.preventDefault();

                document.removeEventListener('click', handler, true);

                const postImage = postImageInput.getValue();
                const postCaption = postCaptionInput.getValue();

                try {
                    logic.addPost(postImage, postCaption);

                    home.remove(fader)

                    buttonBox.onPostCreatedCallback();

                } catch (error) {
                    console.error(error);

                    alert(error.message);
                }
            });

            const postImageFieldDiv = new Field('form__field');
            createPostForm.add(postImageFieldDiv);

            const postImageLabel = new Label('post-image-input');
            postImageLabel.setText('Image');
            postImageFieldDiv.add(postImageLabel);

            const postImageInput = new Input(postImageLabel.getFor());
            postImageInput.setClassName('form__input');
            postImageFieldDiv.add(postImageInput);

            const postCaptionFieldDiv = new Field('form__field');
            createPostForm.add(postCaptionFieldDiv);

            const postCaptionLabel = new Label('post-caption-input');
            postCaptionLabel.setText('Caption');
            postCaptionFieldDiv.add(postCaptionLabel);

            const postCaptionInput = new Input(postCaptionLabel.getFor());
            postCaptionInput.setClassName('form__input');
            postCaptionFieldDiv.add(postCaptionInput);

            const postSubmitButton = new Button('form__button');
            postSubmitButton.setType('submit');
            postSubmitButton.setText('Create');
            createPostForm.add(postSubmitButton);

            const postCancelButton = new Button('form__button');
            postCancelButton.setType('reset');
            postCancelButton.setText('Cancel');
            createPostForm.add(postCancelButton);

            postCancelButton.onClick(() => {
                home.remove(fader)
                document.removeEventListener('click', handler, true);
            });

            document.addEventListener('click', handler, true);

            function handler(e) {
                try {
                    if (e.target === fader.container) {
                        home.remove(fader)
                        document.removeEventListener('click', handler, true);
                    }
                } catch (error) {
                    console.error(error);

                    alert(error.message);
                }
            }
        }
    }
}

export default AddPostButton