import { Request, Response } from 'express';
import { supabaseServer } from '../services/supabaseClient';
import { AuthedRequest } from '../middlewares/auth';

export const updateMembership = async (req: AuthedRequest, res: Response) => {
  const { tier } = req.body;
  if (!tier) return res.status(400).json({ error: 'tier required' });

  // require authenticated user
  if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const updates: any = {
      membership_tier: tier,
      membership_updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabaseServer
      .from('users')
      .upsert({ id: req.user.id, email: req.user.email, ...updates }, { onConflict: 'id' })
      .select()
      .limit(1);
    if (error) throw error;
    return res.json({ user: data?.[0] ?? null });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: 'Failed to update membership' });
  }
};
