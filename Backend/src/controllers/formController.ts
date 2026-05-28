import { Request, Response } from 'express';

export const getFormOptions = async (req: Request, res: Response) => {
  // Mirror frontend FORM_OPTIONS for now
  const options = {
    travelCompanions: ['solo', 'couple', 'friends', 'family'],
    destinations: ['Tokyo', 'Osaka', 'Fukuoka', 'Other'],
    multiSelect: {
      travelStyle: [
        'leisure', 'packed', 'romantic', 'adventure', 'family_fun', 'religious', 'food', 'cultural', 'ecological', 'urban', 'Other',
      ],
      interests: [
        'shopping', 'beauty', 'sports', 'skiing', 'diving', 'hot_springs', 'theme_parks', 'anime', 'art', 'tech', 'history', 'Other',
      ],
      dining: [
        'hotpot', 'sushi', 'bbq', 'buffet', 'western', 'chinese', 'cafe', 'vegetarian', 'desserts', 'michelin', 'Other',
      ],
      accommodation: ['ryokan', 'hotel', 'minshuku', 'capsule', 'resort', 'hostel', 'Other'],
    },
  };
  res.json(options);
};
