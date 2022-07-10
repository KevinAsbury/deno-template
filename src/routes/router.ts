import { Router } from '../deps.ts';
import userController from '../controllers/user.ts';

const router = new Router();

router
  .get('/users', userController.getAllUsers)
  .post('/users', userController.createUser)
  .get('/users/:id', userController.getUserById)
  .put('/users/:id', userController.updateUserById)
  .delete('/users/:id', userController.deleteUserById);

export default router;
