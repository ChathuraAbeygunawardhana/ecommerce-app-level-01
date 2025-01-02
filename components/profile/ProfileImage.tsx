import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../contexts/ThemeContext';

const ProfileImage = () => {
  const [imageUri, setImageUri] = useState('');
  const { theme } = useTheme();
  const currentColors = Colors[theme as 'light' | 'dark'];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.profileImageContainer}>
      {imageUri ? (
        <Image 
          source={{ uri: imageUri }}
          style={styles.profileImage}
        />
      ) : (
        <Ionicons name="person-circle-outline" size={120} color="gray" />
      )}
      <TouchableOpacity style={[styles.cameraIconContainer, { backgroundColor: currentColors.background_02 }]} onPress={pickImage}>
        <Ionicons name="camera" size={24} color={Colors.lightBlue} />
      </TouchableOpacity>
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