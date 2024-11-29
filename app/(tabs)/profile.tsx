import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '../../themes/Colors';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileImage from '../../components/profile/ProfileImage';
import ProfileFields from '../../components/profile/ProfileFields';

const Profile = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  return (
    <View
      style={[styles.container, { backgroundColor: currentColors.background_01 }]}
    >
      <ProfileHeader router={router} currentColors={currentColors} />
      <ProfileImage />
      <ProfileFields currentColors={currentColors} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
