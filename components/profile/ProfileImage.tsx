import React, { useState } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileImage = () => {
  const [imageUri, setImageUri] = useState('https://i.ibb.co/FbpDqkM/image.png');

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
      <Image 
        source={{ uri: imageUri }}
        style={styles.profileImage}
      />
      <Button title="Select Image" onPress={pickImage} />
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
});