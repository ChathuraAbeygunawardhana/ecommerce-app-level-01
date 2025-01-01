import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/profile/Header';
import ProfileImage from '../../components/profile/ProfileImage';

const Profile = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background_01 }]}>
      <Header />
      <ProfileImage />
      <View style={styles.fieldsContainer}>
        <View style={styles.fieldItem}>
          <Text style={[styles.fieldLabel, { color: currentColors.grey }]}>Full name</Text>
          <View style={[styles.fieldValueContainer, { backgroundColor: currentColors.background_02 }]}>
            <Text style={[styles.fieldValue, { color: currentColors.text }]}>John Doe</Text>
          </View>
        </View>
        <View style={styles.fieldItem}>
          <Text style={[styles.fieldLabel, { color: currentColors.grey }]}>Email address</Text>
          <View style={[styles.fieldValueContainer, { backgroundColor: currentColors.background_02 }]}>
            <Text style={[styles.fieldValue, { color: currentColors.text }]}>johndoe@example.com</Text>
          </View>
        </View>
        <View style={styles.fieldItem}>
          <Text style={[styles.fieldLabel, { color: currentColors.grey }]}>Password</Text>
          <View style={[styles.fieldValueContainer, { backgroundColor: currentColors.background_02 }]}>
            <Text style={[styles.fieldValue, { color: currentColors.text }]}>••••••••</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  fieldsContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  fieldItem: {
    marginBottom: 24,
  },
  fieldValueContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  fieldLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});
