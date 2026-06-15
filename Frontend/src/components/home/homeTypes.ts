import type { ImageSourcePropType } from 'react-native';

export interface UpcomingTrip {
  badge: string;
  title: string;
  dateRange: string;
  duration: string;
  accommodationLabel: string;
  accommodationValue: string;
  flightLabel: string;
  flightValue: string;
  heroImage: ImageSourcePropType;
}

export interface QuickAction {
  id: string;
  label: string;
  iconName: string;
  iconLibrary: 'Ionicons' | 'MaterialCommunityIcons' | 'Feather';
  accentColor: string;
  backgroundColor: string;
}

export interface InterestCard {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

export interface BottomNavItem {
  id: string;
  label: string;
  iconName: string;
  iconLibrary: 'Ionicons' | 'MaterialCommunityIcons' | 'Feather';
  active?: boolean;
}