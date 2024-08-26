import { validate, errors } from 'com';

const { SystemError } = errors;

export default (name, surname, email, username, dni, password, passwordRepeat, role = 'tenant') => {
    validate.name(name);
    validate.name(surname, 'surname');
    validate.email(email);
    validate.username(username);
    validate.string(dni);
    validate.password(password);
    validate.password(passwordRepeat, 'passwordRepeat');

    if (password !== passwordRepeat) throw new ValidationError('Passwords do not match');

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, username, dni, password, role }), // Asegúrate de incluir el rol en el cuerpo de la solicitud
    })
        .catch((error) => {
            throw new SystemError(error.message);
        })
        .then((response) => {
            const { status } = response;

            if (status === 201) return; // Usuario registrado con éxito

            return response.json().then((body) => {
                const { error, message } = body;
                const constructor = errors[error];

                throw new constructor(message);
            });
        });
};
