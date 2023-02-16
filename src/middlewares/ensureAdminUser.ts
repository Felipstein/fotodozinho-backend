import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { currentUsersRepository } from '../repositories';

export async function ensureAdminUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req;

  if(!userId) {
    throw new UnauthorizedError();
  }

  const user = await currentUsersRepository.listById(userId);
  if(!user) {
    throw new UnauthorizedError();
  }

  if(!user.admin) {
    return res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Error</title>
        </head>
        <body>
          <pre>Cannot GET /ap</pre>
        </body>
      </html>
    `);
  }

  next();
}
