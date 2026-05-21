import React from 'react';
import { Text, TextInput } from 'react-native';
import i18n from '../../utils/i18n';

interface Props {
  value: string;
  onChange: (text: string) => void;
  error?: string;
  labelKey: string;
  placeholderKey: string;
  styles: any;
}

const BudgetStep: React.FC<Props> = ({ value, onChange, error, labelKey, placeholderKey, styles }) => (
  <>
    <Text style={styles.label}>{i18n.t(labelKey)}</Text>
    <TextInput
      keyboardType="numeric"
      value={value}
      onChangeText={onChange}
      style={styles.input}
      placeholder={i18n.t(placeholderKey)}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </>
);

export default BudgetStep;