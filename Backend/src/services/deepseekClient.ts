import axios from 'axios';

interface DeepseekRequestPayload {
  destination: string;
  startDate: string;
  endDate: string;
  numTourists: number;
  interests: string[];
  budget: number;
  travelStyle?: string[];
  accommodation?: string[];
  travelCompanions?: string;
  startingPlace?: string;
  placesToVisit?: string;
  language?: string;
}

interface ScheduleDay {
  day: number;
  time: string;
  placeName: string;
  address: string;
  price: number;
  activities: string;
  notes: string;
}

interface Hotel {
  name: string;
  address: string;
  type: string;
  pricePerNight: number;
  bookingUrl: string;
}

interface DeepseekResponse {
  schedule: ScheduleDay[];
  hotels: Hotel[];
  summary?: string;
}

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions';

export const callDeepseek = async (input: DeepseekRequestPayload): Promise<DeepseekResponse> => {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY is not configured');
  }

  const prompt = buildPrompt(input);

  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content in Deepseek response');
    }

    return parseDeepseekResponse(content);
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Deepseek API error:', {
      message: err?.message ?? err,
      stack: err?.stack ?? null,
      responseData: err?.response?.data ?? null,
      status: err?.response?.status ?? null,
    });
    throw new Error(`Failed to generate schedule: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
};

function buildPrompt(input: DeepseekRequestPayload): string {
  const duration = calculateDuration(input.startDate, input.endDate);
  const languageNote = input.language ? `Respond in ${input.language} and use appropriate phrasing for that language.` : '';
  return `Generate a ${duration}-day travel itinerary for ${input.numTourists} tourists visiting ${input.destination}.

${languageNote}

Trip Details:
- Start Date: ${input.startDate}
- End Date: ${input.endDate}
- Total Duration: ${duration} days
- Budget: $${input.budget}
- Interests: ${input.interests.join(', ')}
- Travel Style: ${input.travelStyle?.join(', ') || 'General'}
- Accommodation Preferences: ${input.accommodation?.join(', ') || 'Hotel'}
${input.startingPlace ? `- Starting from: ${input.startingPlace}` : ''}
${input.placesToVisit ? `- Must visit: ${input.placesToVisit}` : ''}

Please provide a detailed JSON response with the following structure:
{
  "schedule": [
    {
      "day": 1,
      "time": "09:00",
      "placeName": "Place name",
      "address": "Full address",
      "price": estimated_price_in_usd,
      "activities": "Activity description",
      "notes": "Any notes"
    }
  ],
  "hotels": [
    {
      "name": "Hotel name",
      "address": "Address",
      "type": "hotel/hostel/resort/other",
      "pricePerNight": estimated_price,
      "bookingUrl": "booking_link_or_empty_string"
    }
  ],
  "summary": "Brief trip summary"
}

Ensure all prices are realistic and currency is USD.`;
}

function parseDeepseekResponse(content: string): DeepseekResponse {
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    // eslint-disable-next-line no-console
    console.error('Deepseek parse error: no JSON object found in content', { content });
    throw new Error('Failed to parse JSON from Deepseek response');
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      schedule: parsed.schedule || [],
      hotels: parsed.hotels || [],
      summary: parsed.summary,
    };
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Deepseek parse JSON error:', { error: err?.message ?? err, content });
    throw new Error('Failed to parse JSON from Deepseek response');
  }
}

function calculateDuration(startDate: string, endDate: string): number {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  } catch {
    return 1;
  }
}
