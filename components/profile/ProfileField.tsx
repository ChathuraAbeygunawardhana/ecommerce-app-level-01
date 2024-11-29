import { View, Text } from 'react-native';
import React from 'react';
import { profileFieldStyles } from './styles';

interface ProfileFieldProps {
  label: string;
  value: string;
  currentColors: {
    grey: string;
    background_02: string;
    text: string;
  };
}

const ProfileField = ({ label, value, currentColors }: ProfileFieldProps) => {
  return (
    <View style={profileFieldStyles.fieldItem}>
      <Text
        style={[profileFieldStyles.fieldLabel, { color: currentColors.grey }]}
      >
        {label}
      </Text>
      <View
        style={[
          profileFieldStyles.fieldValueContainer,
          { backgroundColor: currentColors.background_02 },
        ]}
      >
        <Text
          style={[profileFieldStyles.fieldValue, { color: currentColors.text }]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default ProfileField;
