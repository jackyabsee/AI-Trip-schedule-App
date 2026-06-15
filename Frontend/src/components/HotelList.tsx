import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Hotel } from '../src/types';
import i18n from '../utils/i18n';

interface Props {
  hotels: Hotel[];
}

const HotelList: React.FC<Props> = ({ hotels }) => {
  const renderItem = ({ item }: { item: Hotel }) => (
    <View style={styles.hotel}>
      <Text style={styles.hotelName}>{item.name}</Text>
      <Text>{item.address}</Text>
      <Text>{i18n.t('type')}: {i18n.t(item.type)}</Text>
      <Text>{i18n.t('price')}: ${item.pricePerNight}/night</Text>
      <Text style={styles.link} onPress={() => Linking.openURL(item.bookingUrl)}>
        {i18n.t('book_now')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{i18n.t('hotels')}</Text>
      {/* <FlatList
        data={hotels}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  hotel: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  hotelName: { fontSize: 16, fontWeight: 'bold' },
  link: { color: 'blue', textDecorationLine: 'underline' },
});

export default HotelList;