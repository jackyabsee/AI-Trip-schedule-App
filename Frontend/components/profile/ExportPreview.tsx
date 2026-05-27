import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../../utils/i18n';

export default function ExportPreview() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{i18n.t('travel_news_preview_title') || 'Export Preview'}</Text>
      <View style={styles.previewBox}>
        <View style={styles.headerRow}>
          <View style={styles.logoPlaceholder} />
          <View style={styles.circlePlaceholder} />
        </View>
        <View style={styles.rows}>
          <View style={styles.row} />
          <View style={styles.rowShort} />
        </View>
      </View>
      <Text style={styles.cta}>View Template Options</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginHorizontal: 18, marginTop: 12 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  previewBox: { height: 220, backgroundColor: '#FBFBFD', borderRadius: 10, borderWidth: 1, borderColor: '#EAEEF8', overflow: 'hidden' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12 },
  logoPlaceholder: { width: 96, height: 16, backgroundColor: '#EEF2FF', borderRadius: 6 },
  circlePlaceholder: { width: 48, height: 48, backgroundColor: '#EEF2FF', borderRadius: 24 },
  rows: { padding: 12 },
  row: { height: 18, backgroundColor: '#F1F5F9', borderRadius: 6, marginBottom: 8 },
  rowShort: { width: '50%', height: 12, backgroundColor: '#F1F5F9', borderRadius: 6 },
  cta: { marginTop: 8, textAlign: 'center', color: '#0B51F1', fontWeight: '700' },
});
