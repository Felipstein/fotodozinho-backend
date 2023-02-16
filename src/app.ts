import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

import { routes } from './routes/routes';
import { errorHandler } from './middlewares/errorHandler';
import './infra/scheduler';
import { CreateAdminUserIfNotExistsService } from './services/create-admin-user';
import { currentUsersRepository } from './repositories';

const app = express();

function main() {
  const createAdminUserService = new CreateAdminUserIfNotExistsService(currentUsersRepository);

  createAdminUserService.execute()
    .then((status) => {
      if(status === 'CREATED') {
        console.log('🛠 Admin user created');
      }
    })
    .catch(err => console.error('⚠ Failed to create admin user:', err));
}

main();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

export { app };
