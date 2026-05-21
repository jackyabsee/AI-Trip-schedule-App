import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScheduleItem } from '../types';
import i18n from '../utils/i18n';

interface Props {
  schedule: ScheduleItem[];
}

const ScheduleTable: React.FC<Props> = ({ schedule }) => {

  const fields : (keyof ScheduleItem)[] = ['time', 'placeName', 'address', 'activities', 'notes']; //will get from db  
  const renderItem = ({ item }: { item: ScheduleItem }) => (
    <View style={styles.row}>
        {fields.map((field)=>(
          <Text key={field} style={styles.cell}>
              {item[field]}
          </Text>
        ))}
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{i18n.t('schedule')}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View style={styles.row}>
        {fields.map((field)=>(
            <Text key={field}style={[styles.cell, styles.headerCell]}>
              {i18n.t(field)}
            </Text>
        ))}
      </View>
      <FlatList
        data={schedule}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ccc' },
  cell: { flex: 1, padding: 10, textAlign: 'center' },
  headerCell: { fontWeight: 'bold' },
});

export default ScheduleTable;