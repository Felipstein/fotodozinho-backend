import { Router } from 'express';
import { signUpFactory } from '../modules/auth/signup';
import { signInFactory } from '../modules/auth/signin';
import { signOutFactory } from '../modules/auth/signout';
import { validateTokenFactory } from '../modules/auth/validate';
import { preventAuthenticatedAccess } from '../middlewares/preventAuthenticatedAccess';

const route = Router();

route.post('/signin', preventAuthenticatedAccess, (req, res) => {
  return signInFactory().controller.handle(req, res);
});

route.post('/signup', preventAuthenticatedAccess, (req, res) => {
  return signUpFactory().controller.handle(req, res);
});

route.delete('/signout', (req, res) => {
  return signOutFactory().controller.handle(req, res);
});

route.get('/validate', (req, res) => {
  return validateTokenFactory().controller.handle(req, res);
});

export { route as authRoutes };
