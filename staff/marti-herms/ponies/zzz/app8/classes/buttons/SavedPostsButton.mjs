import Button from '../Button.mjs';

import logic from '../../logic/index.mjs';

class SavedPostsButton extends Button {
    constructor() {
        super();
    }

    onClick(buttonBox, callback) {
        this.container.onclick = () => {
            const intervalID = logic.getIntervalID();
            clearInterval(intervalID);

            callback();

            buttonBox.onListSavedPostCallback();
        }
    }
}

export default SavedPostsButton