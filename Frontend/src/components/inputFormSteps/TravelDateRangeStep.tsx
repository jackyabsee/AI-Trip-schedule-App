import React from 'react';
import { Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import i18n from '../../utils/i18n';

interface Props {
  labelKey: string;
  markedDates: any;
  onDayPress: (day: any) => void;
  minDate: string;
  maxDate: string;
  days: number;
  nights: number;
  startDate: string;
  endDate: string;
  error?: string;
  styles: any;
}

const TravelDateRangeStep: React.FC<Props> = ({
  labelKey, markedDates, onDayPress, minDate, maxDate,
  days, nights, startDate, endDate, error, styles
}) => (
  <>
    <Text style={styles.label}>{i18n.t(labelKey)}</Text>
    <Calendar
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      minDate={minDate}
      maxDate={maxDate}
    />
    {startDate && endDate && days > 0 && (
      <Text style={styles.dateDiff}>
        {days}{i18n.t('days')}  {nights}{i18n.t('nights')}
      </Text>
    )}
    {error && <Text style={styles.error}>{error}</Text>}
  </>
);

export default TravelDateRangeStep;