import { Request, Response, NextFunction } from 'express';
import { supabaseServer } from '../services/supabaseClient';

export interface AuthedRequest extends Request {
  user?: { id: string; email?: string } | null;
}

export const verifySupabaseToken = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }
  const token = auth.split(' ')[1];
  try {
    const { data, error } = await supabaseServer.auth.getUser(token);
    if (error || !data?.user) {
      req.user = null;
      return next();
    }
    req.user = { id: data.user.id, email: data.user.email ?? undefined };
    return next();
  } catch (err) {
    req.user = null;
    return next();
  }
};
