// import jwt from 'jsonwebtoken'

// import { errors } from '../../com/index.js'

// const { SessionError } = errors

// export default (req, res, next) => {
//     const { authorization } = req.headers

//     const token = authorization.slice(7)

//     jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
//         if (error) {
//             res.status(498).json({ error: SessionError.name, message: error.message })

//             return
//         }

//         const { sub: userId } = payload

//         req.userId = userId

//         next()
//     })
// }

import jwt from 'jsonwebtoken';
import { errors } from '../../com/index.js';

const { SessionError } = errors;

export default (req, res, next) => {
    const { authorization } = req.headers;

    // Verifica que el header authorization esté presente y tenga el formato correcto
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: SessionError.name, message: 'No authorization token provided or token is malformed.' });
    }

    // Extraer el token del header
    const token = authorization.slice(7);

    // Verificar el token usando la clave secreta
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            // Si el token es inválido o ha expirado, devuelve un error
            return res.status(498).json({ error: SessionError.name, message: error.message });
        }

        // Extraer el `userId` del payload y agregarlo al objeto `req`
        const { sub: userId } = payload;
        req.userId = userId;

        // Continuar con la siguiente función de middleware o ruta
        next();
    });
};