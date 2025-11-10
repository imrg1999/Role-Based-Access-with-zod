import express from 'express';
import { registerUser } from '../Controller/authController.js';

const route = express.Router();

route.post('/register',registerUser);


export default route;