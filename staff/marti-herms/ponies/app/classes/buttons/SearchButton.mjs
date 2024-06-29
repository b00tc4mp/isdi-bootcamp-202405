import Component from '../Component.mjs';
import Button from '../Button.mjs';
import Fader from '../Fader.mjs';
import Paragraph from '../Paragraph.mjs';
import Form from '../Form.mjs';
import Field from '../Field.mjs';
import Label from '../Label.mjs';
import Input from '../Input.mjs';

import logic from '../../logic/index.mjs';

class SearchButton extends Button {
    constructor() {
        super();
    }

    onClick(buttonBox, callback) {
        this.container.onclick = () => {
            const intervalID = logic.getIntervalID();
            clearInterval(intervalID);

            const home = new Component(document.body)

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

                        callback();

                        buttonBox.onUserSearchedCallback(user);

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
        }
    }
}

export default SearchButton