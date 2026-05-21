import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import i18n from '../../utils/i18n';

interface Props {
  companions: string;
  onCompanionChange: (value: string) => void;
  companionsOptions: string[];
  numTourists: number;
  onNumTouristsChange: (text: string) => void;
  showNumTourists: boolean;
  numTouristsError?: string;
  labelKey: string;
  numTouristsLabel: string;
  numTouristsPlaceholder: string;
  styles: any;
}

const CompanionsStep: React.FC<Props> = ({
  companions, onCompanionChange, companionsOptions,
  numTourists, onNumTouristsChange, showNumTourists,
  numTouristsError, labelKey, numTouristsLabel, numTouristsPlaceholder, styles
}) => (
  <>
    <Text style={styles.label}>{i18n.t(labelKey)}</Text>
    <Picker
      selectedValue={companions}
      onValueChange={onCompanionChange}
      style={styles.picker}
    >
      {companionsOptions.map((companion) => (
        <Picker.Item key={companion} label={i18n.t(companion)} value={companion} color="#000" />
      ))}
    </Picker>
    {showNumTourists && (
      <View>
        <Text style={styles.label}>{i18n.t(numTouristsLabel)}</Text>
        <TextInput
          keyboardType="numeric"
          value={numTourists ? String(numTourists) : ''}
          onChangeText={onNumTouristsChange}
          style={styles.input}
          placeholder={i18n.t(numTouristsPlaceholder)}
        />
        {numTouristsError && <Text style={styles.error}>{numTouristsError}</Text>}
      </View>
    )}
  </>
);

export default CompanionsStep;