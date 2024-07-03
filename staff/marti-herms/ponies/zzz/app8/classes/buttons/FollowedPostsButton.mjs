import Button from '../Button.mjs';

import logic from '../../logic/index.mjs';

class FollowedPostsButton extends Button {
    constructor() {
        super();
    }

    onClick(buttonBox, callback) {
        this.container.onclick = () => {
            const intervalID = logic.getIntervalID();
            clearInterval(intervalID);

            callback();

            buttonBox.onFollowedListCallback();
        }
    }
}

export default FollowedPostsButton