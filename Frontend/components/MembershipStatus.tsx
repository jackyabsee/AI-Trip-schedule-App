import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { updateMembership } from '../services/api';
import { User } from '../types';
import i18n from '../utils/i18n';

interface Props {
  user: User;
  onUpdate: (user: User) => void;
}

const MembershipStatus: React.FC<Props> = ({ user, onUpdate }) => {
  const handleUpgrade = async () => {
    try {
      const newTier = user.membership.tier === 'free' ? 'premium' : 'vip';
      const response = await updateMembership(newTier);
      onUpdate(response.user);
    } catch (error) {
      console.error('Failed to upgrade membership:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{i18n.t('membership', { tier: user.membership.tier })}</Text>
      {user.membership.tier !== 'vip' && (
        <Button title={i18n.t('upgrade')} onPress={handleUpgrade} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
});

export default MembershipStatus;