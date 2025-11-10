import express from 'express';
import { registerUser, logInUser } from '../Controller/authController.js';

const route = express.Router();

route.post('/register',registerUser);
route.post('/login',logInUser);

export default route;