import express from 'express';
import logic from './logic/index.js';

const api = express();

api.use(express.json());

api.post('/register/user', (req, res) => {
  const { name, surname, email, username, password } = req.body;

  try {
    logic.registerUser(name, surname, email, username, password);
    res.send('user successfully registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

api.listen(8080, () => console.log('server listening on port 8080'));