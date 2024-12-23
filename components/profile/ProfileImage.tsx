
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const ProfileImage = () => {
  return (
    <View style={styles.profileImageContainer}>
      <Image 
        source={{ uri: 'https://i.ibb.co/FbpDqkM/image.png' }}
        style={styles.profileImage}
      />
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