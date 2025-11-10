import express from 'express';
import { showAllUsers, addNewUser } from '../Controller/userController.js';

const route = express.Router();

route.get('/users',showAllUsers);
route.post('/add',addNewUser);

export default route;