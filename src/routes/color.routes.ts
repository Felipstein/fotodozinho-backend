import { Router } from 'express';
import { createColorFactory } from '../modules/colors/create';
import { listColorsFactory } from '../modules/colors/listAll';
import { listColorByIdFactory } from '../modules/colors/listById';
import { listByColorFactory } from '../modules/colors/listByColor';
import { deleteColorFactory } from '../modules/colors/delete';
import { ensureAdminUser } from '../middlewares/ensureAdminUser';
import { ensureAuth } from '../middlewares/ensureAuth';

const route = Router();

route.use(ensureAuth);

route.get('/', (req, res) => {
  return listColorsFactory().controller.handle(req, res);
});

route.get('/id/:id', (req, res) => {
  return listColorByIdFactory().controller.handle(req, res);
});

route.get('/color/:color', (req, res) => {
  return listByColorFactory().controller.handle(req, res);
});

route.use(ensureAdminUser);

route.post('/', (req, res) => {
  return createColorFactory().controller.handle(req, res);
});

route.delete('/:id', (req, res) => {
  return deleteColorFactory().controller.handle(req, res);
});

export { route as colorRoutes };
