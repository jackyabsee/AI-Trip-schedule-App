import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HotelList from '../../components/HotelList';
import ScheduleTable from '../../components/ScheduleTable';
import { generateSchedule } from '../../services/api';
import { Hotel, ScheduleItem, UserInput } from '../../types';

export default function ScheduleScreen() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const { input } = useLocalSearchParams();
  const userInput: UserInput = input ? JSON.parse(input as string) : null;

  useEffect(() => {
    if (userInput) {
      const fetchSchedule = async () => {
        try {
          const response = await generateSchedule(userInput);
          setSchedule(response.schedule);
          setHotels(response.hotels);
        } catch (error) {
          console.error('Failed to fetch schedule:', error);
        }
      };
      fetchSchedule();
    }
  }, [userInput]);

  return (
    <View style={styles.container}>
      <ScheduleTable schedule={schedule} />
      {hotels.length > 0 && <HotelList hotels={hotels} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});