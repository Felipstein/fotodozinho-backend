import { Router } from 'express';
import { createColorFactory } from '../modules/colors/create';

const route = Router();

route.post('/', (req, res) => {
  return createColorFactory().controller.handle(req, res);
});

export { route as colorRoutes };
