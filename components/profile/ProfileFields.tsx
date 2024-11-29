import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

interface Colors {
  grey: string;
  background_02: string;
  text: string;
}

const ProfileFields = ({ currentColors }: { currentColors: Colors }) => {
  return (
    <View style={styles.fieldsContainer}>
      <View style={styles.fieldItem}>
        <Text style={[styles.fieldLabel, { color: currentColors.grey }]}>
          Full name
        </Text>
        <View
          style={[
            styles.fieldValueContainer,
            { backgroundColor: currentColors.background_02 },
          ]}
        >
          <Text style={[styles.fieldValue, { color: currentColors.text }]}>
            Test user
          </Text>
        </View>
      </View>
      <View style={styles.fieldItem}>
        <Text style={[styles.fieldLabel, { color: currentColors.grey }]}>
          Email address
        </Text>
        <View
          style={[
            styles.fieldValueContainer,
            { backgroundColor: currentColors.background_02 },
          ]}
        >
          <Text style={[styles.fieldValue, { color: currentColors.text }]}>
            testuser@example.com
          </Text>
        </View>
      </View>
      <View style={styles.fieldItem}>
        <Text style={[styles.fieldLabel, { color: currentColors.grey }]}>
          Password
        </Text>
        <View
          style={[
            styles.fieldValueContainer,
            { backgroundColor: currentColors.background_02 },
          ]}
        >
          <Text style={[styles.fieldValue, { color: currentColors.text }]}>
            ••••••••
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileFields;

const styles = StyleSheet.create({
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
  },
  fieldLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});
