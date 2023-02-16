import { Router } from 'express';
import { signUpFactory } from '../modules/auth/signup';

const route = Router();

route.post('/signup', (req, res) => {
  return signUpFactory().controller.handle(req, res);
});

export { route as authRoutes };
