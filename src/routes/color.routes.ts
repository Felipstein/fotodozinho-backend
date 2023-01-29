import { Router } from 'express';
import { createColorFactory } from '../modules/colors/create';
import { listColorsFactory } from '../modules/colors/listAll';
import { listColorByIdFactory } from '../modules/colors/listById';
import { listByColorFactory } from '../modules/colors/listByColor';

const route = Router();

route.get('/', (req, res) => {
  return listColorsFactory().controller.handle(req, res);
});

route.get('/id/:id', (req, res) => {
  return listColorByIdFactory().controller.handle(req, res);
});

route.get('/color/:color', (req, res) => {
  return listByColorFactory().controller.handle(req, res);
});

route.post('/', (req, res) => {
  return createColorFactory().controller.handle(req, res);
});

export { route as colorRoutes };
