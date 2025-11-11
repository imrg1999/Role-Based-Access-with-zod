import express from 'express';
import { userAccess } from '../Controller/roleController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';
const route = express.Router();

route.post('/user',authMiddleware,userAccess);

export default route;