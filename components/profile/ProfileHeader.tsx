
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/Colors';

interface ProfileHeaderProps {
  router: { back: () => void };
  currentColors: { text: string };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ router, currentColors }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color={currentColors.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: currentColors.text }]}>
        Profile
      </Text>
      <TouchableOpacity>
        <Ionicons name="create-outline" size={24} color={Colors.lightBlue} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});