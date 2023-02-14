import { Router } from 'express';
import { createPrintFactory } from '../modules/print/create';

const route = Router();

route.post('/', (req, res) => {
  return createPrintFactory().controller.handle(req, res);
});

export { route as printRoutes };
