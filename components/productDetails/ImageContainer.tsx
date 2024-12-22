import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface ImageContainerProps {
  mainImage: string;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ mainImage }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: 'https://i.ibb.co/wsBMks4/Group-136.png' }}
        style={styles.circleImage}
      />
      <Image
        source={{ uri: mainImage }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 50,
    marginBottom: 65,
    transform: [{ scaleX: -1 }, { rotate: '20deg' }],
  },
  circleImage: {
    width: 350,
    height: 300,
    resizeMode: 'contain',
    position: 'absolute',
    top: 130,
  },
});

export default ImageContainer;
