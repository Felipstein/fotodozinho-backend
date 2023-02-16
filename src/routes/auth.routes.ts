import { Router } from 'express';
import { signUpFactory } from '../modules/auth/signup';
import { signInFactory } from '../modules/auth/signin';
import { signOutFactory } from '../modules/auth/signout';

const route = Router();

route.post('/signin', (req, res) => {
  return signInFactory().controller.handle(req, res);
});

route.post('/signup', (req, res) => {
  return signUpFactory().controller.handle(req, res);
});

route.delete('/signout', (req, res) => {
  return signOutFactory().controller.handle(req, res);
});

export { route as authRoutes };
