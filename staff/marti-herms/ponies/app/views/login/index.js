(() => {
    const form = document.querySelector('form');

    form.onsubmit = (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById('username-input');
        const passwordInput = document.getElementById('password-input');

        const username = usernameInput.value;
        const password = passwordInput.value;

        try {
            loginUser(username, password);

            location.href = '../home';
        } catch (error) {
            alert(error.message);
        }
    }

    const a = document.querySelector('a')

    a.onclick = (event) => {
        event.preventDefault();

        location.href = '../register';
    }
})();