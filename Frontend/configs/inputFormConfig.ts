import { UserInput } from '../types';

/**
 * Default user input values.
 */
export const DEFAULT_USER_INPUT: UserInput = {
  budget: 0,  
  startDate: '',
  endDate: '',
  duration: 0,
  travelCompanions: 'solo',
  destination: 'Tokyo',
  travelStyle: [],
  interests: [],
  dining: [],
  accommodation: [],
  numTourists: 0,
};

/**
 * Validation rules for the input form.
 */
export const VALIDATION_RULES = {
  MIN_BUDGET: 1000,
  MIN_DURATION: 1,
  MIN_NUM_TOURISTS: 2,
};

/**
 * Hardcoded form options for development.
 * Replace with dynamic fetching when backend is ready.
 */
export const FORM_OPTIONS = {
  travelCompanions: ['solo', 'couple', 'friends', 'family'] as const,
  destinations: ['Tokyo', 'Osaka', 'Fukuoka', 'unknown'] as const,
  multiSelect: {
    travelStyle: [
      'leisure', 'packed', 'romantic', 'adventure', 'family_fun', 'religious', 'food', 'cultural', 'ecological', 'urban',
    ],
    interests: [
      'shopping', 'beauty', 'sports', 'skiing', 'diving', 'hot_springs', 'theme_parks', 'anime', 'art', 'tech', 'history',
    ],
    dining: [
      'hotpot', 'sushi', 'bbq', 'buffet', 'western', 'chinese', 'cafe', 'vegetarian', 'desserts', 'michelin',
    ],
    accommodation: ['ryokan', 'hotel', 'minshuku', 'capsule', 'resort', 'hostel'],
  },
};

/**
 * Centralized constants for styling and logic.
 */
export const FORM_CONSTANTS = {
  COLOR_TEAL: '#4FD1C5',
  COLOR_RED: '#F56565',
  COLOR_BLUE: '#BEE3F8',
  COLOR_GOLD: '#FFD700',
  COLOR_TEXT_WHITE: '#fff',
  COLOR_TEXT_DARK: '#1A365D',
  COLOR_CHECKED: '#007AFF',
  COLOR_UNCHECKED: '#000',
  COLOR_ERROR: 'red',
  COLOR_DISABLED: '#aaa',
  COLOR_BUTTON: '#007AFF',
  DATE_RANGE_MONTHS: 2,
  LABEL_KEYS: {
    budget: 'budget',
    enterBudget: 'enter_budget',
    travelDateRange: 'travel_date_range',
    duration: 'duration',
    days: 'days',
    nights: 'nights',
    companions: 'companions',
    numTourists: 'num_tourists',
    numTouristsPlaceholder: 'num_tourists_placeholder',
    destination: 'destination',
    generateSchedule: 'generate_schedule',
  }
};

/**
 * --- Dynamic (non-hardcoded) version for production ---
 * When your backend is ready, use the following approach:
 *
 * 1. Uncomment the import and function below.
 * 2. Replace all usages of FORM_OPTIONS in your components with formOptions state.
 * 3. Fetch options from backend on component mount.
 */

// import { fetchFormOptions } from '../services/api';
// export const getFormOptions = async () => {
//   return await fetchFormOptions();
// };

