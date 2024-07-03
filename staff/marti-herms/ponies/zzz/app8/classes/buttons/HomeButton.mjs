import Button from '../Button.mjs';

import logic from '../../logic/index.mjs';

class HomeButton extends Button {
    constructor() {
        super();
    }

    onClick(buttonBox, callback) {
        this.container.onclick = () => {
            const intervalID = logic.getIntervalID();
            clearInterval(intervalID);

            callback();

            buttonBox.onListFeedCallback();
        }
    }
}

export default HomeButton