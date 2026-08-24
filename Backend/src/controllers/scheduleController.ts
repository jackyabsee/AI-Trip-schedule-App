import { Request, Response } from 'express';
import { supabaseServer } from '../services/supabaseClient';
import { callDeepseek } from '../services/deepseekClient';
import { AuthedRequest } from '../middlewares/auth';

export const generateSchedule = async (req: AuthedRequest, res: Response) => {
  const input = req.body;
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'Unauthorized. Please log in to generate a schedule.' });
  }
  if (!input || !input.destination) {
    return res.status(400).json({ error: 'Invalid input: destination required' });
  }
  if (!input || !input.destination) {
    return res.status(400).json({ error: 'Invalid input: destination required' });
  }

  if (!input.startDate || !input.endDate) {
    return res.status(400).json({ error: 'Invalid input: startDate and endDate required' });
  }

  if (!input.numTourists || input.numTourists < 1) {
    return res.status(400).json({ error: 'Invalid input: numTourists must be at least 1' });
  }
  console.log('Received schedule generation request:', { body: input, userId: req.user?.id ?? null });
  // Call Deepseek AI to generate schedule
  let deepseekResponse: any = null;
  let schedule: any[] = [];
  let hotels: any[] = [];

  console.log('Calling Deepseek API with input:', input);
  try {
    deepseekResponse = await callDeepseek({
      destination: input.destination,
      startDate: input.startDate,
      endDate: input.endDate,
      numTourists: input.numTourists,
      interests: input.interests || [],
      budget: Number(input.budget) || 0,
      currency: input.currency || 'HKD',
      travelStyle: input.travelStyle || [],
      accommodation: input.accommodation || [],
      startingPlace: input.startingPlace || '',
      placesToVisit: input.placesToVisit || '',
      language: input.language || undefined,
    });
    schedule = deepseekResponse?.schedule || [];
    hotels = deepseekResponse?.hotels || [];
  } catch (err: any) {
    // eslint-disable-next-line no-console
    const message = err?.message || 'Failed to generate schedule';
    return res.status(500).json({ error: message });
  }
  console.log("Deepseek Response:", deepseekResponse);

  // Persist schedule to database if user authenticated
  if (req.user && req.user.id) {
    try {
      const duration = Math.max(1, Math.ceil((new Date(input.endDate).getTime() - new Date(input.startDate).getTime()) / (1000 * 60 * 60 * 24)));
      const payload = {
        user_id: req.user.id,
        destination: input.destination,
        start_date: input.startDate || null,
        end_date: input.endDate || null,
        duration,
        payload: { input, deepseekResponse },
        title: deepseekResponse?.title || '我的專屬旅遊行程',
      };

      const { data, error } = await supabaseServer.from('schedules').insert([payload]).select('id');
      if (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to persist schedule to DB:', { error, payload });
        return res.status(201).json({ ...(deepseekResponse || {}), id: null, dbError: error?.message || null });
      }

      return res.status(201).json({ ...(deepseekResponse || {}), id: data?.[0]?.id || null });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('Failed to persist schedule:', { message: err?.message ?? err, stack: err?.stack });
      return res.status(500).json({ error: err?.message || 'Failed to save schedule' });
    }
  }

  // If no authenticated user return the full Deepseek response (not persisted)
  return res.json({ ...(deepseekResponse || {}), id: null });
};

export const getSchedule = async (req: AuthedRequest, res: Response) => {
  try {
    const { id } = req.params;
    console.log('Received get schedule request:', { scheduleId: id, userId: req.user?.id ?? null });
    if (!id) return res.status(400).json({ error: 'Schedule ID required' });
    if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

    const { data, error } = await supabaseServer.from('schedules').select('*').eq('id', id).eq('user_id', req.user.id).single();
    if (error || !data) return res.status(404).json({ error: 'Schedule not found' });
    return res.json(data);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Get schedule error:', { message: err?.message ?? err, stack: err?.stack });
    return res.status(500).json({ error: err?.message || 'Failed to fetch schedule' });
  }
};

export const updateSchedule = async (req: AuthedRequest, res: Response) => {
  try {
    console.log('Received schedule update request:', { params: req.params, body: req.body, userId: req.user?.id ?? null });
    const { id } = req.params;
    const { payload,title } = req.body; // The modified JSON from the frontend

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabaseServer
      .from('schedules')
      .update({ payload ,title})
      .eq('id', id)
      .eq('user_id', req.user.id) // Security check: Ensure they own it
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
