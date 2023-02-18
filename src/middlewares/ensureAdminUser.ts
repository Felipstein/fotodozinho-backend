import { NextFunction, Request, Response } from 'express';
import { NotFoundHTMLTemplate } from '../shared/NotFoundHTMLTemplate';
import { verifyUserAuth } from '../services/verify-user-auth';

export async function ensureAdminUser(req: Request, res: Response, next: NextFunction) {
  const { userId } = req;

  const html = NotFoundHTMLTemplate.getHTML(req.originalUrl, req.method);

  try {
    await verifyUserAuth.ensureAdminUser(userId);
  } catch {
    return res.status(404).send(html);
  }

  next();
}
