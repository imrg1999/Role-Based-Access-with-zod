import express from 'express';
import { showAllUsers, 
    addNewUser,
    updateUser,
    deleteUser
 } from '../Controller/userController.js';

const route = express.Router();

route.get('/users',showAllUsers);
route.post('/add',addNewUser);
route.put('/update/:id',updateUser);
route.delete('/delete/:id',deleteUser);

export default route;