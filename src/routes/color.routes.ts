import { Router } from 'express';
import { createColorFactory } from '../modules/colors/create';
import { listColorsFactory } from '../modules/colors/listAll';

const route = Router();

route.get('/', (req, res) => {
  return listColorsFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createColorFactory().controller.handle(req, res);
});

export { route as colorRoutes };
