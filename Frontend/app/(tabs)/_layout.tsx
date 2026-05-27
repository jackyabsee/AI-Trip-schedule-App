import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import HomeHeader from '../../components/home/HomeHeader';
import BottomNav from '../../components/home/BottomNav';
import type { BottomNavItem } from '../../components/home/homeTypes';
import i18n from '../../utils/i18n';

const TITLE_BY_ROUTE: Record<string, string> = {
  index: 'home_title',
  plans: 'home_nav_plans',
  schedule: 'schedule',
  settings: 'settings',
  'travel-news': 'travel_news_page_title',
  'travelers-forum': 'forum_page_title',
};

const LABEL_BY_ROUTE: Record<string, string> = {
  index: 'home_nav_home',
  plans: 'home_nav_plans',
  schedule: 'home_nav_schedule',
  settings: 'home_nav_settings',
};

const VISIBLE_ROUTES = new Set(['index', 'plans', 'schedule', 'settings']);

const ICON_BY_ROUTE: Record<string, { iconLibrary: BottomNavItem['iconLibrary']; iconName: string }> = {
  index: { iconLibrary: 'Ionicons', iconName: 'home-outline' },
  plans: { iconLibrary: 'Ionicons', iconName: 'add-circle-outline' },
  schedule: { iconLibrary: 'Ionicons', iconName: 'calendar-outline' },
  settings: { iconLibrary: 'Ionicons', iconName: 'settings-outline' },
};

function renderTabBar(props: BottomTabBarProps) {
  const activeRouteName = props.state.routes[props.state.index]?.name;
  const items: BottomNavItem[] = props.state.routes
    .filter((route) => VISIBLE_ROUTES.has(route.name))
    .map((route) => {
    const icon = ICON_BY_ROUTE[route.name] ?? { iconLibrary: 'Ionicons' as const, iconName: 'ellipse-outline' };

    return {
      id: route.name,
      labelKey: LABEL_BY_ROUTE[route.name] ?? route.name,
      iconLibrary: icon.iconLibrary,
      iconName: icon.iconName,
      active: activeRouteName === route.name,
    };
    });

  return <BottomNav items={items} onPressItem={(item) => props.navigation.navigate(item.id as never)} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        header: () => <HomeHeader title={i18n.t(TITLE_BY_ROUTE[route.name] ?? 'home_title')} />,
      })}
      tabBar={renderTabBar}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          title: 'Plans',
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
      <Tabs.Screen
        name="travel-news"
        options={{
          title: 'Travel News',
        }}
      />
      <Tabs.Screen
        name="travelers-forum"
        options={{
          title: 'Travel Forum',
        }}
      />
    </Tabs>
  );
}
