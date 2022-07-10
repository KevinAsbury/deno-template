import { Router } from 'https://deno.land/x/oak/mod.ts';
import userController from '../controllers/user.ts';

const router = new Router();

router
  .get('/users', userController.getAllUsers)
  .post('/users', userController.createUser)
  .get('/users/:id', userController.getUserById)
  .put('/users/:id', userController.updateUser)
  .delete('/users/:id', userController.deleteUser);

export default router;
