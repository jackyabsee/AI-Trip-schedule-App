import React from 'react';
import { Text, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import i18n from '../../utils/i18n';

interface Props {
  destination: string;
  onDestinationChange: (value: string) => void;
  destinationOptions: string[];
  error?: string;
  labelKey: string;
  styles: any;
  images: Record<string, any>;
}

const DestinationStep: React.FC<Props> = ({
  destination, onDestinationChange, destinationOptions, error, labelKey, styles, images
}) => (
  <>
    <Text style={styles.label}>{i18n.t(labelKey)}</Text>
    {destination && images[destination] && (
      <Image
        source={images[destination]}
        style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 10 }}
        resizeMode="cover"
      />
    )}
    <Picker
      selectedValue={destination}
      onValueChange={onDestinationChange}
      style={styles.picker}
    >
      {destinationOptions.map((d) => (
        <Picker.Item key={d} label={i18n.t(d)} value={d} color="#000" />
      ))}
    </Picker>
    {error && <Text style={styles.error}>{error}</Text>}
  </>
);

export default DestinationStep;