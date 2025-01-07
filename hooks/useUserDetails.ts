import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState<{ fullName: string; email: string; imageUri?: string }>({ fullName: '', email: '' });

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const storedUserDetails = await AsyncStorage.getItem('userDetails');
        if (storedUserDetails) {
          setUserDetails(JSON.parse(storedUserDetails));
        }
      } catch (error) {
        console.error('Failed to load user details', error);
      }
    };

    loadUserDetails();
  }, []);

  const uploadImage = async (imageUri: string) => {
    const apiKey = 'd2b6d5c7a8dc4cd3b04758c585e935fe';
    const formData = new FormData();
    const fileName = imageUri.split('/').pop();
    const fileType = fileName?.split('.').pop();

    formData.append('image', {
      uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
      type: `image/${fileType}`,
      name: fileName,
    } as any);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.data.url) {
        console.log('Image uploaded successfully:', result.data.url);
      }
      return result.data.url;
    } catch (error) {
      console.error('Failed to upload image', error);
      return null;
    }
  };

  const saveUserDetails = async (details: { fullName: string; email: string; imageUri?: string }, isImageEdited: boolean) => {
    try {
      if (isImageEdited && details.imageUri) {
        const imageUrl = await uploadImage(details.imageUri);
        if (imageUrl) {
          details.imageUri = imageUrl;
        }
      }
      await AsyncStorage.setItem('userDetails', JSON.stringify(details));
      setUserDetails(details);
    } catch (error) {
      console.error('Failed to save user details', error);
    }
  };

  return { userDetails, saveUserDetails, uploadImage };
};

export default useUserDetails;
