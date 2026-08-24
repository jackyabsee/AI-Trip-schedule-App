import axios from 'axios';

interface DeepseekRequestPayload {
  destination: string;
  startDate: string;
  endDate: string;
  numTourists: number;
  interests: string[];
  budget: number;
  currency: string;
  travelStyle?: string[];
  accommodation?: string[];
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
  latitude?: number;
  longitude?: number;
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
  title: string;
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
let prompt = `You are an expert, local travel planner. Your task is to design a logical, highly realistic, and memorable travel itinerary.\n\n`;
  
  prompt += `Trip Details:\n`;
  prompt += `- Destination: ${input.destination}\n`;
  prompt += `- Dates: ${input.startDate} to ${input.endDate}\n`;
  prompt += `- Travelers: ${input.numTourists}\n`;
  prompt += `- Total Budget: ${input.budget} ${input.currency || 'HKD'} (excluding flights)\n`;
  
  if (input.interests && input.interests.length > 0) {
    prompt += `- Interests: ${input.interests.join(', ')}\n`;
  }
  if (input.travelStyle && input.travelStyle.length > 0) {
    prompt += `- Travel Style: ${input.travelStyle.join(', ')}\n`;
  }
  if (input.accommodation && input.accommodation.length > 0) {
    prompt += `- Preferred Accommodation: ${input.accommodation.join(', ')}\n`;
  }
  if (input.startingPlace) {
    prompt += `- Starting Point: ${input.startingPlace}\n`;
  }
  if (input.placesToVisit) {
    prompt += `- Must-Visit Places: ${input.placesToVisit}\n`;
  }

  // 2. Constraints & Logistics
  prompt += `\nGuidelines for the Itinerary:\n`;
  prompt += `1. Factor in realistic travel times between locations.\n`;
  prompt += `2. Do not overcrowd the days; maintain a comfortable pace suitable for the travel style.\n`;
  prompt += `3. Keep estimated prices highly realistic for the current year in ${input.currency || 'HKD'}.\n`;
  prompt += `4. Provide all text, names, and descriptions in the following language: ${input.language || 'zh-TW'}.\n`;
  prompt += `5. You MUST provide highly accurate 'latitude' and 'longitude' float coordinates for every placeName so they can be plotted on a map`;


  // 3. Strict JSON Output Formatting (Including the new Title field)
  prompt += `\nCRITICAL: You MUST respond ONLY with a raw, valid JSON object. Do NOT wrap the JSON in Markdown formatting (no \`\`\`json tags). Do NOT include any conversational text before or after the JSON. Use the exact structure below:\n`;
  
  prompt += `{
  "title": "A catchy, descriptive name for this trip (e.g., 'Tokyo 5-Day Tech & Anime Tour')",
  "summary": "A brief overview of the trip's pacing, highlights, and any important local tips.",
  "schedule": [
    {
      "day": 1,
      "time": "09:00",
      "placeName": "Exact name of the location",
      "address": "Full physical address",
      "price": 150,
      "latitude": 47.497, 
      "longitude": 19.048,
      "activities": "Detailed description of what to do, eat, or see here.",
      "notes": "Travel tips, transport advice, or warnings (e.g., 'Book tickets 2 weeks in advance')."
    }
  ],
  "hotels": [
    {
      "name": "Recommended Hotel Name",
      "address": "Hotel Address",
      "type": "hotel/hostel/resort",
      "pricePerNight": 800,
      "bookingUrl": "Leave empty if unknown"
    }
  ]
}`;

  return prompt;}

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
      title: parsed.title || '我的專屬旅遊行程',
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
