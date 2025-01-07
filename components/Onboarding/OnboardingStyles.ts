// TODO: this file can be rename as Onboard.Styles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  onboardingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
    marginTop: 200,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  onboardingTitle: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
    marginLeft: -2,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    marginTop: 0,
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'flex-start',
    bottom: 20,
    paddingLeft: 20,
    paddingBottom: 40,
  },
  textSpacing: {
    height: 250,
  }
});
