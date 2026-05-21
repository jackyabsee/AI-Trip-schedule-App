import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import i18n from '../../utils/i18n';

interface Props {
  step: string;
  options: string[];
  selected: string[];
  onSelect: (option: string) => void;
  error?: string;
  styles: any;
  images?: Record<string, any>;
}

const MultiSelectStep: React.FC<Props> = ({
  step, options, selected, onSelect, error, styles, images
}) => (
  <View>
    <Text style={styles.label}>{i18n.t(step)}</Text>
    <View style={styles.multiSelectContainer}>
      {options.map((option, idx) => (
        <View
          key={option}
          style={[
            styles.multiSelectItemWrapper,
            idx % 2 === 0 ? { marginRight: '4%' } : null,
          ]}
        >
          {images && images[option] && (
            <Image
              source={images[option]}
              style={styles.optionImageSmall}
              resizeMode="cover"
            />
          )}
          <TouchableOpacity
            style={styles.multiSelectItem}
            onPress={() => onSelect(option)}
          >
            <Ionicons
              name={selected.includes(option) ? 'checkbox' : 'square-outline'}
              size={24}
              color={selected.includes(option) ? '#2e7d32' : '#aaa'}
            />
            <Text style={styles.multiSelectText}>{i18n.t(option)}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

export default MultiSelectStep;