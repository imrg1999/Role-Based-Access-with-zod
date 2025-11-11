import express from 'express';
import { userAccess, adminAccess, managerAccess } from '../Controller/roleController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';
import { roleMiddleware } from '../Middleware/roleMiddleware.js';
const route = express.Router();

route.post('/user',authMiddleware,roleMiddleware('user','admin','manager'),userAccess);
route.post('/manager',authMiddleware,roleMiddleware('manager','admin'),managerAccess);
route.post('/admin',authMiddleware,roleMiddleware('admin'),adminAccess);

export default route;