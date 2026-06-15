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
  try {
    deepseekResponse = await callDeepseek({
      destination: input.destination,
      startDate: input.startDate,
      endDate: input.endDate,
      numTourists: input.numTourists,
      interests: input.interests || [],
      budget: Number(input.budget) || 0,
      travelStyle: input.travelStyle || [],
      accommodation: input.accommodation || [],
      travelCompanions: input.travelCompanions || '',
      startingPlace: input.startingPlace || '',
      placesToVisit: input.placesToVisit || '',
      language: input.language || undefined,
    });
    schedule = deepseekResponse?.schedule || [];
    hotels = deepseekResponse?.hotels || [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Schedule generation failed:', {
      message: err?.message ?? err,
      body: input,
      stack: err?.stack,
      response: err?.response?.data ?? err?.response ?? null,
    });
    const message = err?.message || 'Failed to generate schedule';
    return res.status(500).json({ error: message });
  }

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
      };

      const { data, error } = await supabaseServer.from('schedules').insert([payload]).select('id');
      if (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to persist schedule to DB:', { error, payload });
        return res.status(201).json({ ...(deepseekResponse || {}), id: null, dbError: error?.message || null });
      }

      return res.status(201).json({ ...(deepseekResponse || {}), id: data?.[0]?.id || null });
    } catch (err) {
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
    if (!id) return res.status(400).json({ error: 'Schedule ID required' });
    if (!req.user || !req.user.id) return res.status(401).json({ error: 'Unauthorized' });

    const { data, error } = await supabaseServer.from('schedules').select('*').eq('id', id).eq('user_id', req.user.id).single();
    if (error || !data) return res.status(404).json({ error: 'Schedule not found' });
    return res.json(data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Get schedule error:', { message: err?.message ?? err, stack: err?.stack });
    return res.status(500).json({ error: err?.message || 'Failed to fetch schedule' });
  }
};
