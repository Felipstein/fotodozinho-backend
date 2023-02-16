import { Router } from 'express';
import { signUpFactory } from '../modules/auth/signup';
import { signInFactory } from '../modules/auth/signin';

const route = Router();

route.post('/signin', (req, res) => {
  return signInFactory().controller.handle(req, res);
});

route.post('/signup', (req, res) => {
  return signUpFactory().controller.handle(req, res);
});

export { route as authRoutes };
