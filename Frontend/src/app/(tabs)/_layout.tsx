import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomNavItem } from '../../components/home/homeTypes';
import i18n, { subscribeLanguageChange } from '../../utils/i18n';

function HomeHeader({ title }: { title: string }) {
  return (
    <View style={headerStyles.container}>
      <Pressable hitSlop={10} style={headerStyles.iconButton} onPress={() => {}}>
        <Feather name="compass" size={22} color="#111827" />
      </Pressable>
      <Text style={headerStyles.title}>{title}</Text>
      <Pressable hitSlop={10} style={headerStyles.iconButton} onPress={() => {}}>
        <Ionicons name="add-circle-outline" size={28} color="#111827" />
      </Pressable>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
  },
  iconButton: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: '#0B51F1',
    letterSpacing: -0.5,
  },
});

function BottomNav({ items, onPressItem }: { items: BottomNavItem[]; onPressItem?: (item: BottomNavItem) => void }) {
  function renderIcon(item: BottomNavItem, isActive: boolean) {
    const color = isActive ? '#FFFFFF' : '#2F3545';

    if (item.iconLibrary === 'Feather') {
      return <Feather name={item.iconName as any} size={24} color={color} />;
    }

    if (item.iconLibrary === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={item.iconName as any} size={24} color={color} />;
    }

    return <Ionicons name={item.iconName as any} size={24} color={color} />;
  }

  return (
    <View style={navStyles.container}>
      {items.map((item) => {
        const isActive = Boolean(item.active);
        return (
          <Pressable key={item.id} style={navStyles.item} onPress={() => onPressItem?.(item)}>
            <View style={[navStyles.iconBubble, isActive ? navStyles.iconBubbleActive : navStyles.iconBubbleInactive]}>
              {renderIcon(item, isActive)}
            </View>
            <Text style={[navStyles.label, isActive && navStyles.labelActive]}>{i18n.t((item as any).labelKey ?? item.label)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const navStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EF',
  },
  item: {
    alignItems: 'center',
    gap: 6,
    minWidth: 66,
  },
  iconBubble: {
    width: 68,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubbleActive: {
    backgroundColor: '#0B51F1',
  },
  iconBubbleInactive: {
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 12,
    color: '#2F3545',
    fontWeight: '500',
  },
  labelActive: {
    color: '#0B51F1',
    fontWeight: '700',
  },
});

const TITLE_BY_ROUTE: Record<string, string> = {
  index: 'home_title',
  plans: 'home_nav_plans',
  'schedule-list': 'schedule',
  settings: 'settings',
  'travel-news': 'travel_news_page_title',
  'travelers-forum': 'forum_page_title',
};

const LABEL_BY_ROUTE: Record<string, string> = {
  index: 'home_nav_home',
  plans: 'home_nav_plans',
  'schedule-list': 'home_nav_schedule',
  settings: 'home_nav_settings',
};

const VISIBLE_ROUTES = new Set(['index', 'plans', 'schedule-list', 'settings']);

const ICON_BY_ROUTE: Record<string, { iconLibrary: BottomNavItem['iconLibrary']; iconName: string }> = {
  index: { iconLibrary: 'Ionicons', iconName: 'home-outline' },
  plans: { iconLibrary: 'Ionicons', iconName: 'add-circle-outline' },
  'schedule-list': { iconLibrary: 'Ionicons', iconName: 'calendar-outline' },
  settings: { iconLibrary: 'Ionicons', iconName: 'settings-outline' },
};

// renderTabBar will be defined inside TabLayout so it re-evaluates when language changes

export default function TabLayout() {
  const [lang, setLang] = useState<string>(i18n.locale || 'zh');

  useEffect(() => {
    const unsub = subscribeLanguageChange((lng) => setLang(lng));
    return unsub;
  }, []);

  function renderTabBar(props: BottomTabBarProps) {
    const activeRouteName = props.state.routes[props.state.index]?.name;
    const items: BottomNavItem[] = props.state.routes
      .filter((route) => VISIBLE_ROUTES.has(route.name))
      .map((route) => {
      const icon = ICON_BY_ROUTE[route.name] ?? { iconLibrary: 'Ionicons' as const, iconName: 'ellipse-outline' };

      return {
        id: route.name,
        label: LABEL_BY_ROUTE[route.name] ?? route.name,
        iconLibrary: icon.iconLibrary,
        iconName: icon.iconName,
        active: activeRouteName === route.name,
      } as BottomNavItem;
      });

    return <BottomNav items={items} onPressItem={(item) => props.navigation.navigate(item.id as never)} />;
  }

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
        name="schedule-list"
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
