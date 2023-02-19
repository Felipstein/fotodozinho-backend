import { NextFunction, Request, Response } from 'express';
import { NotFoundHTMLTemplate } from '../shared/NotFoundHTMLTemplate';
import { verifyUserAuth } from '../services/verify-user-auth';
import { currentUsersRepository } from '../repositories';

export async function ensureAdminUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req;

  const html = NotFoundHTMLTemplate.getHTML(req.originalUrl, req.method);

  try {
    await verifyUserAuth.ensureAdminUser(userId);
  } catch {
    return res.status(404).send(html);
  }

  const user = await currentUsersRepository.listById(userId);
  req.userIsAdmin = user.admin;

  next();
}
