# System Design Plan: AI-Powered Tourist Schedule App

## 1. Overview
The **AI-Powered Tourist Schedule App** helps users plan personalized travel itineraries by collecting preferences through interactive questions, generating a schedule using AI, and providing hotel recommendations and a map with the schedule's path. The app supports English and Chinese (simplified/traditional) and includes a membership system for premium services.

### Objectives
- Collect user preferences (travel dates, destination, style, interests, dining, accommodation).
- Generate a schedule table with time, place, address, activities, and notes.
- Provide hotel options for overnight stays.
- Display a map with a path connecting schedule locations.
- Support membership tiers (`free`, `premium`, `vip`) for additional services.

## 2. System Architecture
The app uses a **client-server architecture** with the following components:
- **Frontend**: React Native for cross-platform mobile apps (iOS, Android).
- **Backend**: Express.js with TypeScript for API management and AI integration.
- **Database**: MongoDB for user data, cached activities, restaurants, and hotels.
- **External Services**:
  - xAI Grok 3 API: Schedule generation.
  - Google Maps API: Geocoding, directions, and map rendering.
  - Tabelog API: Japanese restaurants (alternative to OpenRice).
  - Booking.com/Agoda API: Hotel data.
  - OpenWeatherMap API: Weather-based adjustments.

### Architecture Diagram
```
[User] --> [React Native App]
                     |
                     v
[Express.js API] --> [MongoDB]
                     |
                     v
[External APIs: xAI, Google Maps, Tabelog, Booking.com, OpenWeatherMap]
```

## 3. Functional Requirements
### 3.1. User Input Collection
Users answer questions in English or Chinese:
- **Travel Dates**: "你計劃什麼時候去旅遊？" (Calendar picker, duration, season: spring/summer/autumn/winter).
- **Companions**: "你與旅伴的關係？" (Solo, couple, friends, family).
- **Destination**: "你計劃到什麼地方旅遊？" (Initially Tokyo, Osaka, Fukuoka; option for "unknown").
- **Travel Style**: "你理想的旅行風格？" (Leisure, packed, romantic, adventure, family, religious, food, cultural, ecological, urban).
- **Interests**: "你或旅伴的興趣是？" (Shopping, beauty, sports, skiing, diving, hot springs, theme parks, anime, art, tech, history, culture).
- **Dining**: "你喜歡的餐廳是？" (Hotpot, sushi, BBQ, buffet, Western, Chinese, cafe, vegetarian, desserts, Michelin).
- **Accommodation**: "你喜歡的住宿類型？" (Hot spring ryokan, hotel, minshuku, capsule hotel, resort, hostel).

### 3.2. Schedule Generation
- AI generates a table with:
  - **Columns**: Time, Place Name, Address, What to Do, Notes.
  - **Optimization**: Considers proximity, time constraints, and preferences.
- Example:
  | Time       | Place Name         | Address            | What to Do             | Notes                     |
  |------------|--------------------|--------------------|------------------------|---------------------------|
  | 9:00 AM    | Tokyo Skytree      | 1-1-2 Oshiage      | Visit observation deck | Buy tickets online        |
  | 12:00 PM   | Sushi Zanmai       | 4-2-1 Asakusa      | Lunch                  | Try omakase set           |
  | 2:00 PM    | Asakusa Temple     | 2-3-1 Asakusa      | Explore temple         | Wear comfortable shoes    |
  | 7:00 PM    | Vegan Cafe         | 3-5-2 Shinjuku     | Dinner                 | Reserve a table           |

### 3.3. Hotel Recommendations
- List hotels for overnight stays (duration > 1 day).
- Filter by type (ryokan, hotel, capsule, etc.) and price.
- Include name, address, type, price per night, and booking URL.

### 3.4. Map Integration
- Display a map above/below the schedule table.
- Show markers for each location and a polyline connecting them.

### 3.5. Membership System
- Users have a membership tier (`free`, `premium`, `vip`) for accessing premium services (e.g., real-time bookings, offline access).
- Tier updates are tracked with timestamps.

### 3.6. Multilingual Support
- Support English and Chinese (simplified/traditional) for UI and AI output.

## 4. Non-Functional Requirements
- **Scalability**: Handle 10,000+ concurrent users.
- **Performance**: API response time < 2 seconds.
- **Security**: JWT authentication, HTTPS, input validation.
- **Reliability**: Cache external API responses for offline scenarios.
- **Usability**: Intuitive UI, accessibility, multilingual support.

## 5. Frontend Design (React Native)

### 5.1. Components
- **InputForm**: Collects user preferences with calendar pickers, dropdowns, and multi-select.
- **ScheduleTable**: Displays the schedule as a table.
- **HotelList**: Shows filterable hotel options.
- **MapView**: Renders a map with markers and a polyline.
- **LanguageToggle**: Switches between English and Chinese.
- **MembershipStatus**: Displays and allows tier updates (e.g., upgrade to premium).

### 5.2. Screens
1. **Welcome Screen**: Intro and language selection.
2. **Input Screen**: Interactive questions.
3. **Schedule Screen**: Schedule table, hotel list, map.
4. **Settings Screen**: Language, membership tier, notifications.

### 5.3. Dependencies
- `react-native-maps`: Map rendering.
- `react-native-date-picker`: Date selection.
- `axios`: API calls.
- `i18n-js`: Multilingual support.

## 6. Backend Design (Express.js with TypeScript)

### 6.1. Folder Structure
```
backend/
├── src/
│   ├── controllers/
│   │   └── scheduleController.ts
│   │   └── userController.ts
│   ├── services/
│   │   ├── aiService.ts
│   │   ├── activityService.ts
│   │   ├── restaurantService.ts
│   │   ├── hotelService.ts
│   │   └── mapService.ts
│   ├── models/
│   │   ├── userInput.ts
│   │   ├── schedule.ts
│   │   ├── hotel.ts
│   │   └── userSchema.ts
│   ├── routes/
│   │   └── scheduleRoutes.ts
│   │   └── userRoutes.ts
│   ├── middleware/
│   │   └── validateInput.ts
│   ├── config/
│   │   └── db.ts
│   └── index.ts
├── .env
├── package.json
└── tsconfig.json
```

### 6.2. API Endpoints
| Endpoint                     | Method | Description                              | Request Body                     | Response                           |
|------------------------------|--------|------------------------------------------|----------------------------------|------------------------------------|
| `/api/schedule/generate`     | POST   | Generate schedule and hotels             | `UserInput`                      | `{ schedule: ScheduleItem[], hotels: Hotel[], mapPath: Coordinates[] }` |
| `/api/schedule/hotels`       | GET    | Fetch hotels for a destination           | Query: `destination`, `type`     | `{ hotels: Hotel[] }`             |
| `/api/schedule/map`          | POST   | Generate map path                        | `{ locations: Location[] }`      | `{ path: Coordinates[] }`         |
| `/api/users/membership`      | PATCH  | Update membership tier                   | `{ tier: string }`               | `{ user: User }`                  |

### 6.3. Models
#### UserInput
```typescript
export interface UserInput {
  travelDates: string;
  duration: number;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  travelCompanions: 'solo' | 'couple' | 'friends' | 'family';
  destination: string;
  travelStyle: string[];
  interests: string[];
  dining: string[];
  accommodation: string[];
}
```

#### ScheduleItem
```typescript
export interface ScheduleItem {
  time: string;
  placeName: string;
  address: string;
  whatToDo: string;
  notes: string;
  latitude?: number;
  longitude?: number;
}
```

#### Hotel
```typescript
export interface Hotel {
  name: string;
  address: string;
  type: string;
  pricePerNight: number;
  bookingUrl: string;
}
```

### 6.4. Key Services
- **aiService**: Integrates with xAI Grok 3 to generate schedules.
- **activityService**: Fetches activities from Tabelog/TripAdvisor.
- **restaurantService**: Fetches restaurants from Tabelog.
- **hotelService**: Fetches hotels from Booking.com.
- **mapService**: Generates map paths using Google Maps API.

## 7. Database Design (MongoDB)

### 7.1. Schemas
#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  preferences: {
    language: String, // 'en' or 'zh'
    lastInput: {
      travelDates: String,
      duration: Number,
      season: String,
      travelCompanions: String,
      destination: String,
      travelStyle: [String],
      interests: [String],
      dining: [String],
      accommodation: [String]
    }
  },
  membership: {
    tier: String, // 'free', 'premium', 'vip'
    updatedAt: Date
  },
  createdAt: Date
}
```

#### Activities Collection (cached)
```javascript
{
  _id: ObjectId,
  destination: String,
  name: String,
  address: String,
  tags: [String],
  latitude: Number,
  longitude: Number,
  lastUpdated: Date
}
```

#### Restaurants Collection (cached)
```javascript
{
  _id: ObjectId,
  destination: String,
  name: String,
  address: String,
  cuisine: [String],
  latitude: Number,
  longitude: Number,
  lastUpdated: Date
}
```

#### Hotels Collection (cached)
```javascript
{
  _id: ObjectId,
  destination: String,
  name: String,
  address: String,
  type: String,
  pricePerNight: Number,
  bookingUrl: String,
  latitude: Number,
  longitude: Number,
  lastUpdated: Date
}
```

### 7.2. Caching Strategy
- Cache external API responses with a 24-hour TTL.
- Index `destination`, `tags`, and `cuisine` for fast queries.
- Refresh cache on API updates or daily schedule.

## 8. Data Flow
1. **User Input**:
   - User answers questions in React Native.
   - Inputs sent to `POST /api/schedule/generate`.
2. **Backend Processing**:
   - Validate inputs and check membership tier.
   - Query MongoDB or external APIs for activities/restaurants/hotels.
   - Call xAI Grok 3 to generate schedule.
   - Geocode addresses for map path.
3. **Response**:
   - Return `{ schedule, hotels, mapPath }`.
   - Frontend renders table, hotel list, and map.
4. **Membership Update**:
   - User updates tier via `PATCH /api/users/membership`.
   - Backend updates `membership.tier` and `membership.updatedAt`.

## 9. External APIs
- **xAI Grok 3**: Schedule generation ([https://x.ai/api](https://x.ai/api)).
- **Google Maps API**: Geocoding and directions.
- **Tabelog API**: Japanese restaurants.
- **Booking.com API**: Hotels.
- **OpenWeatherMap API**: Weather adjustments.

## 10. Scalability and Performance
- **Backend**: Use PM2 for clustering, `express-rate-limit` for rate limiting.
- **Database**: MongoDB sharding, indexes on `destination` and `tags`.
- **Frontend**: Lazy-load map and hotel list, use `FlatList` for schedules.
- **Caching**: Redis for API responses, MongoDB for long-term caching.

## 11. Security
- **Authentication**: JWT for user sessions and premium features.
- **Validation**: `class-validator` for inputs.
- **HTTPS**: Enforce secure communication.
- **API Keys**: Store in `.env`, use secrets manager in production.
- **CORS**: Restrict to frontend domain.

## 12. Development Timeline
| Phase             | Tasks                                                                 | Duration |
|-------------------|----------------------------------------------------------------------|----------|
| Planning          | Finalize requirements, schemas, APIs                                 | 1 week   |
| Frontend          | Build input forms, schedule table, hotel list, map, membership UI    | 3 weeks  |
| Backend           | Set up Express.js, APIs, AI/external API integration                  | 3 weeks  |
| Database          | Design MongoDB schemas, caching, indexes                             | 1 week   |
| Integration       | Connect frontend-backend, test APIs                                  | 1 week   |
| Testing           | Unit tests, integration tests, user testing                         | 2 weeks  |
| Deployment        | Deploy to Vercel/AWS, CI/CD, monitoring                             | 1 week   |
| **Total**         |                                                                      | 12 weeks |

## 13. Challenges and Mitigations
- **AI Schedule Issues**: Validate with Google Maps for timing.
- **API Limits**: Cache responses, use fallbacks.
- **Multilingual UI**: Use `i18n-js`, test with native speakers.
- **Map Performance**: Optimize with lazy loading, limit markers.

## 14. Next Steps
- **Prototype**: Build for Tokyo with static data.
- **API Integration**: Sign up for xAI, Google Maps, Tabelog.
- **User Testing**: Validate UI with English/Chinese users.
- **Monetization**: Premium features via `premium`/`vip` tiers.