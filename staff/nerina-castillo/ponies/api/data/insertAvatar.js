function insertAvatar(avatar) {
    const avatars = localStorage.avatars ? JSON.parse(localStorage.avatars) : [];

    avatars.push(avatar);

    localStorage.avatars = JSON.stringify(avatars);
}

export default insertAvatar;