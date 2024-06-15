var form = document.querySelector('form')

form.onsubmit = function (event) {

    event.preventDefault()

    var nameInput = document.getElementById('name')
    var surnameInput = document.getElementById('surname')
    var emailInput = document.getElementById('email')
    var usernameInput = document.getElementById('username')
    var passwordInput = document.getElementById('password')
    var passwordRepeatInput = document.getElementById('password2')


    var name = nameInput.value
    var surname = surnameInput.value
    var email = emailInput.value
    var username = usernameInput.value
    var password = passwordInput.value
    var passwordRepeat = passwordRepeatInput.value

    try {

        registerUser(name, surname, email, username, password, passwordRepeat)

        alert('user successfully registered')

        location.href = '../login'

    } catch (error) {

        alert(error.message)

    }

}

var a = document.querySelector('a')

a.onclick = function (event) {

    event.preventDefault()
    location.href = '../login'
}
