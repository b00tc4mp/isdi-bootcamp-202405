import express from 'express';
import logic from './logic/index.js';

const api = express();

api.use(express.json());

api.post('/login/user', (req, res) => {
    const { username, password } = req.body;

    try {
        logic.authenticateUser(username, password);
        res.send('user successfully logined');
    } catch (error) {
        console.error('Error:', error.message);
        res.status(400).send(error.message);
    }
});

api.listen(8080, () => console.log('server listening on port 8080'));