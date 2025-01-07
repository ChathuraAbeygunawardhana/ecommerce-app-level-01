import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileImageProps {
  isEditable: boolean;
  setImageUri: (uri: string) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ isEditable, setImageUri }) => {
  const [localImageUri, setLocalImageUri] = useState('');
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  useEffect(() => {
    const loadImageUri = async () => {
      try {
        const storedUserDetails = await AsyncStorage.getItem('userDetails');
        if (storedUserDetails) {
          const userDetails = JSON.parse(storedUserDetails);
          if (userDetails.imageUri) {
            setLocalImageUri(userDetails.imageUri);
          }
        }
      } catch (error) {
        console.error('Failed to load image URI', error);
      }
    };

    loadImageUri();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLocalImageUri(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.profileImageContainer}>
      {localImageUri ? (
        <Image 
          source={{ uri: localImageUri }}
          style={styles.profileImage}
        />
      ) : (
        <Ionicons name="person-circle-outline" size={120} color="gray" />
      )}
      {isEditable && (
        <TouchableOpacity style={[styles.cameraIconContainer, { backgroundColor: currentColors.background_02 }]} onPress={pickImage}>
          <Ionicons name="camera" size={24} color={Colors.lightBlue} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIconContainer: {
    marginTop: -25, 
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    padding: 8,
    borderWidth: 1, 
    borderColor: Colors.grey,
  },
});