import data from '../data/index.mjs';

import Component from './Component.mjs';
import Field from './Field.mjs';
import Paragraph from './Paragraph.mjs';

class Profile extends Component {
    constructor(className) {
        super(document.createElement('div'));
        this.setClassName(className);

        const user = data.findUser(user => user.username === sessionStorage.username)

        const profileName = new Paragraph('h2');
        profileName.setText(user.name + ' // ' + user.username);
        this.add(profileName);

        const profileInfo = new Field('profile-info');
        this.add(profileInfo)

        const posts = new Paragraph('h3');
        posts.setText('Posts:   ' + user.yourPosts.length);
        profileInfo.add(posts);

        const followers = new Paragraph('h3');
        followers.setText('Followers:   ' + user.followers.length);
        profileInfo.add(followers);

        const following = new Paragraph('h3');
        following.setText('Following:   ' + user.following.length);
        profileInfo.add(following);
    }
}

export default Profile