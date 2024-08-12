import { useState } from 'react'
import logic from '../../logic'
import Container from '../library/Container'
import Link from '../library/Link'

export default function Register({ onRegister, onLoginClick }) {
    const [role, setRole] = useState('user')
    const [selectedPets, setSelectedPets] = useState([])

    const handleRoleChange = event => {
        setRole(event.target.value)
    }

    const handlePetChange = event => {
        const { value, checked } = event.target

        if (checked) {
            setSelectedPets([...selectedPets, value])
        } else {
            setSelectedPets(selectedPets.filter(pet => pet !== value))
        }
    }

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const imageInput = form['image-input']
        const nameInput = form['name-input']
        const surnameInput = form['surname-input']
        const emailInput = form['email-input']
        const usernameInput = form['username-input']
        const passwordInput = form['password-input']
        const passwordRepeatInput = form['password-repeat-input']
        const roleInput = form['role-input']
        const petsitterNameInput = form['petsitter-name-input']
        const cityInput = form['city-input']
        const descriptionInput = form['description-input']

        const image = imageInput.value
        const name = nameInput.value
        const surname = surnameInput.value
        const email = emailInput.value
        const username = usernameInput.value
        const password = passwordInput.value
        const passwordRepeat = passwordRepeatInput.value
        const role = roleInput.value
        const petsitterName = petsitterNameInput !== undefined ? petsitterNameInput.value : null
        const city = cityInput !== undefined ? cityInput.value : null
        const description = descriptionInput !== undefined ? descriptionInput.value : null
        const pets = selectedPets

        try {
            logic.registerUser(image, name, surname, email, username, password, passwordRepeat, role, petsitterName, city, description, pets)
                .then(() => onRegister())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    return <main>
        <header>Registro</header>

        <form onSubmit={handleRegisterSubmit} >
            <Container>
                <label htmlFor="image-input">Imagen</label>
                <input id="image-input" value='https://hospitalveterinariodonostia.com/wp-content/uploads/2018/12/6-lugares-donde-puedes-ver-animales-exoticos-6.jpg' />
            </Container>

            <Container>
                <label htmlFor="name-input">Nombre</label>
                <input type="text" id="name-input" name="name" placeholder="nombre" />
            </Container>

            <Container>
                <label htmlFor="surname-input">Apellidos</label>
                <input type="text" id="surname-input" name="surname" placeholder="apellidos" />
            </Container>

            <Container>
                <label htmlFor="email-input">Email</label>
                <input type="email" id="email-input" name="email" placeholder="email" />
            </Container>

            <Container>
                <label htmlFor="username-input">Nombre de usuario</label>
                <input type="text" id="username-input" name="username" placeholder="nombre de usuario" />
            </Container>

            <Container>
                <label htmlFor="password-input">Contraseña</label>
                <input type="password" name="password" id="password-input" placeholder="contraseña" />
            </Container>

            <Container>
                <label htmlFor="password-repeat-input">Repite contraseña</label>
                <input type="password" id="password-repeat-input" name="password-repeat" placeholder="repite contraseña" />
            </Container>

            <Container>
                <label htmlFor="role-input">Usuario</label>
                <input
                    type="radio"
                    id="role-input"
                    name="roleInput"
                    value="user"
                    checked={role === 'user'}
                    onChange={handleRoleChange}
                />

                <label htmlFor="role-petsitter">Guardería</label>
                <input
                    type="radio"
                    id="role-petsitter"
                    name="roleInput"
                    value="petsitter"
                    checked={role === 'petsitter'}
                    onChange={handleRoleChange}
                />

            </Container>

            {role === 'petsitter' && (
                <Container>
                    <label htmlFor="petsitter-name-input">Nombre Guardería</label>
                    <input type="text" id="petsitter-name-input" name="petsitterName" placeholder="Nombre Guardería" />
                </Container>
            )}

            {role === 'petsitter' && (
                <Container>
                    <select name="city" id="city-input">
                        <option value="">Seleccione una ciudad</option>
                        <option value="madrid">Madrid</option>
                        <option value="barcelona">Barcelona</option>
                        <option value="valencia">Valencia</option>
                        <option value="sevilla">Sevilla</option>
                        <option value="zaragoza">Zaragoza</option>
                        <option value="malaga">Málaga</option>
                        <option value="murcia">Murcia</option>
                        <option value="palma">Palma</option>
                        <option value="las_palmas">Las Palmas de Gran Canaria</option>
                        <option value="bilbao">Bilbao</option>
                        <option value="alicante">Alicante</option>
                        <option value="cordoba">Córdoba</option>
                        <option value="valladolid">Valladolid</option>
                        <option value="vigo">Vigo</option>
                        <option value="gijon">Gijón</option>
                        <option value="l_hospitalet">L'Hospitalet de Llobregat</option>
                        <option value="vitoria">Vitoria-Gasteiz</option>
                        <option value="la_coruna">La Coruña</option>
                        <option value="granada">Granada</option>
                        <option value="elche">Elche</option>
                        <option value="oviedo">Oviedo</option>
                        <option value="badalona">Badalona</option>
                        <option value="sabadell">Sabadell</option>
                        <option value="cartagena">Cartagena</option>
                        <option value="terrassa">Terrassa</option>
                        <option value="jerez">Jerez de la Frontera</option>
                        <option value="santander">Santander</option>
                        <option value="almeria">Almería</option>
                        <option value="burgos">Burgos</option>
                        <option value="albacete">Albacete</option>
                        <option value="san_sebastian">San Sebastián</option>
                        <option value="salamanca">Salamanca</option>
                        <option value="logrono">Logroño</option>
                        <option value="lleida">Lleida</option>
                        <option value="marbella">Marbella</option>
                        <option value="cadiz">Cádiz</option>
                        <option value="huelva">Huelva</option>
                        <option value="tarragona">Tarragona</option>
                        <option value="leon">León</option>
                        <option value="jaen">Jaén</option>
                        <option value="ourense">Ourense</option>
                        <option value="algeciras">Algeciras</option>
                        <option value="gerona">Gerona</option>
                        <option value="lugo">Lugo</option>
                    </select>
                </Container>
            )}

            {role === 'petsitter' && (
                <Container>
                    <label htmlFor="description-input">Descripción</label>
                    <input type="text" id="description-input" name="description" placeholder="descripcion" />
                </Container>
            )}

            {role === 'petsitter' && (
                <Container>
                    <label htmlFor="pets-input">¿Qué animales cuidas?</label><br /><br />

                    <input
                        type="checkbox"
                        id="rabbit-input"
                        value="Rabbit"
                        onChange={handlePetChange}
                    />
                    <label htmlFor="rabbit-input">Conejos</label><br />

                    <input
                        type="checkbox"
                        id="guinea-pig-input"
                        value="GuineaPig"
                        onChange={handlePetChange}
                    />
                    <label htmlFor="guinea-pig-input">Cobayas</label><br />

                    <input
                        type="checkbox"
                        id="hamsters-input"
                        value="Hamsters"
                        onChange={handlePetChange}
                    />
                    <label htmlFor="hamsters-input">Hamsters</label><br />

                    <input
                        type="checkbox"
                        id="birds-input"
                        value="Birds"
                        onChange={handlePetChange}
                    />
                    <label htmlFor="birds-input">Aves</label><br />

                    <input
                        type="checkbox"
                        id="reptiles-input"
                        value="Reptiles"
                        onChange={handlePetChange}
                    />
                    <label htmlFor="reptiles-input">Reptiles</label><br /><br />
                </Container>
            )}
            <button type="submit">{'Register'}</button>
        </form>

        <Link onClick={handleLoginClick}>Login</Link>
    </main>
}