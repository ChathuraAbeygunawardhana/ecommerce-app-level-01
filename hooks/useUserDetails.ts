import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState({ fullName: '', email: '' });

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

  const saveUserDetails = async (details: { fullName: string; email: string }) => {
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(details));
      setUserDetails(details);
    } catch (error) {
      console.error('Failed to save user details', error);
    }
  };

  return { userDetails, saveUserDetails };
};

export default useUserDetails;
