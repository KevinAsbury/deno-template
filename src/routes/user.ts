import { Router } from 'https://deno.land/x/oak/mod.ts';
import userController from '../controllers/user.ts';

const router = new Router();

router
  .get('/todos', userController.getAllUsers)
  .post('/todos', userController.createUser)
  .get('/todos/:id', userController.getUserById)
  .put('/todos/:id', userController.updateUser)
  .delete('/todos/:id', userController.deleteUser);

export default router;
