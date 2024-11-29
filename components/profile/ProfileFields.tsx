import { View } from 'react-native';
import React from 'react';
import ProfileField from './ProfileField';
import { profileFieldsStyles } from './styles';

interface Colors {
  grey: string;
  background_02: string;
  text: string;
}

const ProfileFields = ({ currentColors }: { currentColors: Colors }) => {
  return (
    <View style={profileFieldsStyles.fieldsContainer}>
      <ProfileField
        label="Full name"
        value="John Doe"
        currentColors={currentColors}
      />
      <ProfileField
        label="Email address"
        value="johndoe@example.com"
        currentColors={currentColors}
      />
      <ProfileField
        label="Password"
        value="••••••••"
        currentColors={currentColors}
      />
    </View>
  );
};

export default ProfileFields;