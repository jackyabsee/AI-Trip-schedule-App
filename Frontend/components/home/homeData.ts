import { BottomNavItem, InterestCard, QuickAction, UpcomingTrip } from './homeTypes';

export const upcomingTrip: UpcomingTrip = {
  badge: 'In 12 Days',
  title: 'Kyoto & Osaka Adventure',
  dateRange: 'Oct 15 - Oct 22',
  duration: '7 Days',
  accommodationLabel: 'Accommodation',
  accommodationValue: 'Ryokan Kinuya',
  flightLabel: 'Next Flight',
  flightValue: 'JL002 • 10:45 AM',
  heroImage: require('../../assets/images/destination/Tokyo.jpg'),
};

export const quickActions: QuickAction[] = [
  {
    id: 'plan',
    label: 'Plan New Trip',
    iconName: 'sparkles',
    iconLibrary: 'Ionicons',
    accentColor: '#0F4CFF',
    backgroundColor: '#0F4CFF',
  },
  {
    id: 'saved',
    label: 'Saved Trips',
    iconName: 'heart-outline',
    iconLibrary: 'Ionicons',
    accentColor: '#111827',
    backgroundColor: '#E8EAF5',
  },
  {
    id: 'map',
    label: 'Map Explore',
    iconName: 'map-outline',
    iconLibrary: 'Ionicons',
    accentColor: '#111827',
    backgroundColor: '#E8EAF5',
  },
  {
    id: 'language',
    label: 'Language',
    iconName: 'translate',
    iconLibrary: 'MaterialCommunityIcons',
    accentColor: '#111827',
    backgroundColor: '#E8EAF5',
  },
];

export const interestCards: InterestCard[] = [
  {
    id: 'anime',
    title: 'Anime',
    image: require('../../assets/images/interests/anime.jpeg'),
  },
  {
    id: 'art',
    title: 'Art',
    image: require('../../assets/images/interests/art.png'),
  },
  {
    id: 'hot-springs',
    title: 'Onsen',
    image: require('../../assets/images/interests/hot_springs.png'),
  },
  {
    id: 'skiing',
    title: 'Skiing',
    image: require('../../assets/images/interests/skiing.png'),
  },
  {
    id: 'theme-parks',
    title: 'Theme Parks',
    image: require('../../assets/images/interests/theme_parks.png'),
  },
  {
    id: 'beauty',
    title: 'Beauty',
    image: require('../../assets/images/interests/beauty.png'),
  },
];

export const bottomNavItems: BottomNavItem[] = [
  {
    id: 'home',
    label: 'Home',
    iconName: 'home-outline',
    iconLibrary: 'Ionicons',
    active: true,
  },
  {
    id: 'plans',
    label: 'Plans',
    iconName: 'add-circle-outline',
    iconLibrary: 'Ionicons',
  },
  {
    id: 'history',
    label: 'History',
    iconName: 'time-outline',
    iconLibrary: 'Ionicons',
  },
  {
    id: 'profile',
    label: 'Profile',
    iconName: 'person-outline',
    iconLibrary: 'Ionicons',
  },
];