import Component from './Component.mjs'
import Button from './Button.mjs'
import Fader from './Fader.mjs'
import Paragraph from './Paragraph.mjs'
import Form from './Form.mjs'
import Field from './Field.mjs'
import Label from './Label.mjs'
import Input from './Input.mjs'

import logic from '../logic/index.mjs'

class Footer extends Component {
    constructor() {
        super(document.createElement('footer'));
        this.container.className = 'footer';

        const home = new Component(document.body);

        const feedListButton = new Button();
        feedListButton.setClassName('feed-button');
        feedListButton.setColor('gray');
        this.add(feedListButton);

        feedListButton.onClick(() => {
            const intervalID = logic.getIntervalID();
            clearInterval(intervalID);

            userSearchButton.setColor('white');
            feedListButton.setColor('gray');
            savedPostListButton.setColor('white');


            this.onListFeedCallback();
        })

        const userSearchButton = new Button();
        userSearchButton.setClassName('search-button');
        userSearchButton.setColor('white');
        this.add(userSearchButton);

        userSearchButton.onClick(() => {
            const intervalID = logic.getIntervalID();
            clearInterval(intervalID);

            const fader = new Fader();
            fader.setDisplay('flex');
            home.add(fader);

            const searchUserSection = new Component(document.createElement('section'));
            searchUserSection.setClassName('usersearch');
            fader.add(searchUserSection);

            const searchUserTitle = new Paragraph('h2');
            searchUserTitle.setText('Search User');
            searchUserSection.add(searchUserTitle);

            const searchUserForm = new Form('form');
            searchUserSection.add(searchUserForm);

            searchUserForm.onSubmit((event) => {
                event.preventDefault();

                document.removeEventListener('click', handler, true);

                const username = searchUserInput.getValue();

                try {
                    const user = logic.searchUser(username);

                    if (user !== null) {

                        home.remove(fader);

                        userSearchButton.setColor('gray');
                        feedListButton.setColor('white');
                        savedPostListButton.setColor('white');

                        this.onUserSearchedCallback(user);

                    }

                } catch (error) {
                    console.error(error);

                    alert(error.message);
                }
            });

            const searchUserFieldDiv = new Field('form__field');
            searchUserForm.add(searchUserFieldDiv);

            const searchUserLabel = new Label('post-caption-input');
            searchUserLabel.setText('Username: ');
            searchUserFieldDiv.add(searchUserLabel);

            const searchUserInput = new Input(searchUserLabel.getFor());
            searchUserInput.setClassName('form__input');
            searchUserFieldDiv.add(searchUserInput);

            const searchUserButton = new Button('form__button');
            searchUserButton.setType('submit');
            searchUserButton.setText('Create');
            searchUserForm.add(searchUserButton);

            const searchUserCancelButton = new Button('form__button');
            searchUserCancelButton.setType('reset');
            searchUserCancelButton.setText('Cancel');
            searchUserForm.add(searchUserCancelButton);

            searchUserCancelButton.onClick(() => {
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


        })

        const addPostButton = new Button();
        addPostButton.setClassName('add-post-button');
        addPostButton.setText('+');
        this.add(addPostButton);

        addPostButton.onClick((event) => {
            event.stopPropagation();

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

                    this.onPostCreatedCallback();

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
        })

        const savedPostListButton = new Button();
        savedPostListButton.setClassName('save-button');
        savedPostListButton.setColor('white');
        this.add(savedPostListButton);

        savedPostListButton.onClick(() => {
            const intervalID = logic.getIntervalID();
            clearInterval(intervalID);

            userSearchButton.setColor('white');
            feedListButton.setColor('white');
            savedPostListButton.setColor('gray');

            this.onListSavedPostCallback();
        })
    }

    onPostCreated(callback) {
        this.onPostCreatedCallback = callback;
    }

    onListFeed(callback) {
        this.onListFeedCallback = callback;
    }

    onListSavedPost(callback) {
        this.onListSavedPostCallback = callback;
    }

    onUserSearched(callback) {
        this.onUserSearchedCallback = callback;
    }
}

export default Footer;