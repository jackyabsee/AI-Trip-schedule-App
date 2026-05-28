import { Request, Response } from 'express';
import { supabaseServer } from '../services/supabaseClient';
import { AuthedRequest } from '../middlewares/auth';

// Minimal mock schedule generator — replace with real planner/AI integration
export const generateSchedule = async (req: AuthedRequest, res: Response) => {
  const input = req.body;
  if (!input || !input.destination) {
    return res.status(400).json({ error: 'Invalid input: destination required' });
  }

  // create a simple schedule based on duration
  const duration = Number(input.duration) || 1;
  const schedule = [] as any[];
  for (let i = 0; i < duration; i++) {
    schedule.push({
      day: i + 1,
      time: '09:00',
      placeName: `${input.destination} Sightseeing ${i + 1}`,
      address: `${input.destination} Main St ${i + 1}`,
      price: 0,
      activities: 'Sightseeing',
      notes: '',
    });
  }

  const hotels = [
    { name: `${input.destination} Hotel`, address: 'Central', type: 'hotel', pricePerNight: 120, bookingUrl: '' },
  ];

  // persist schedule if user present
  if (req.user && req.user.id) {
    try {
      const payload = {
        user_id: req.user.id,
        destination: input.destination,
        start_date: input.startDate || null,
        end_date: input.endDate || null,
        duration: duration,
        payload: { input, schedule, hotels },
      };
      await supabaseServer.from('schedules').insert([payload]);
    } catch (err) {
      // log and continue
      // eslint-disable-next-line no-console
      console.error('Failed to persist schedule', err);
    }
  }

  return res.json({ schedule, hotels });
};
