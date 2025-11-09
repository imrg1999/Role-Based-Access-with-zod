import express from 'express';
import { showAllUsers } from '../Controller/userController.js';

const route = express.Router();

route.get('/users',showAllUsers);

export default route;