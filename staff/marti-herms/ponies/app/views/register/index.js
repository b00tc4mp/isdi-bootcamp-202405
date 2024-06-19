(function () {
    var EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/
    var NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/
    var USER_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/
    //var PASSWORD_REGEX = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/
    var PASSWORD_REGEX = /^\w{8,}$/;
    var form = document.querySelector('form')

    form.onsubmit = function (event) {
        event.preventDefault()

        var nameInput = document.getElementById('name-input')
        var surnameInput = document.getElementById('surname-input')
        var emailInput = document.getElementById('email-input')
        var usernameInput = document.getElementById('username-input')
        var passwordInput = document.getElementById('password-input')
        var passwordRepeatInput = document.getElementById('password2-input')

        var name = nameInput.value
        var surname = surnameInput.value
        var email = emailInput.value
        var username = usernameInput.value
        var password = passwordInput.value
        var passwordRepeat = passwordRepeatInput.value

        try {
            registerUser(name, surname, email, username, password, passwordRepeat);

            alert('user succesfully registered');

            location.href = '../login';
        } catch (error) {
            alert(error.message);
        }
    }

    var a = document.querySelector('a')

    a.onclick = function (event) {
        event.preventDefault()

        location.href = '../login'
    }
})();