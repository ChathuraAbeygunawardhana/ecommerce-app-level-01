import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../../components/profile/Header';
import ProfileImage from '../../components/profile/ProfileImage';
import useUserDetails from '@/hooks/useUserDetails';

const Profile = () => {
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];
  const [isEditable, setIsEditable] = useState(false);
  const { userDetails, saveUserDetails, uploadImage } = useUserDetails();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    setFullName(userDetails.fullName);
    setEmail(userDetails.email);
    setImageUri(userDetails.imageUri || '');
  }, [userDetails]);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const saveChanges = async () => {
    await saveUserDetails({ fullName, email, imageUri });
    setIsEditable(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background_01 }]}>
      <Header onEditPress={toggleEdit} />
      <ProfileImage isEditable={isEditable} setImageUri={setImageUri} />
      <View style={styles.fieldsContainer}>
        <View style={styles.fieldItem}>
          <Text style={[styles.fieldLabel, { color: currentColors.grey }]}>Full name</Text>
          <TextInput
            style={[styles.fieldValueContainer, { backgroundColor: currentColors.background_02, color: currentColors.text }]}
            value={fullName}
            onChangeText={setFullName}
            editable={isEditable}
          />
        </View>
        <View style={styles.fieldItem}>
          <Text style={[styles.fieldLabel, { color: currentColors.grey }]}>Email address</Text>
          <TextInput
            style={[styles.fieldValueContainer, { backgroundColor: currentColors.background_02, color: currentColors.text }]}
            value={email}
            onChangeText={setEmail}
            editable={isEditable}
          />
        </View>
        
      </View>
      {isEditable && (
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 16,
    fontWeight: '500',
  },
  fieldLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: Colors.lightBlue,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
