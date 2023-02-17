import { NextFunction, Request, Response } from 'express';
import { currentUsersRepository } from '../repositories';
import { NotFoundHTMLTemplate } from '../shared/NotFoundHTMLTemplate';

export async function ensureAdminUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req;

  const html = NotFoundHTMLTemplate.getHTML(req.originalUrl, req.method);

  if(!userId) {
    return res.status(404).send(html);
  }

  const user = await currentUsersRepository.listById(userId);
  if(!user) {
    return res.status(404).send(html);
  }

  if(!user.admin) {
    return res.status(404).send(html);
  }

  next();
}
