import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import InputForm from '../components/InputForm';
import { UserInput } from '../types';

export default function InputScreen() {
  const router = useRouter();

  const handleSubmit = (input: UserInput) => {
    router.push({ pathname: '/schedule', params: { input: JSON.stringify(input) } });
  };

  return (
    <View style={styles.container}>
      <InputForm onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});