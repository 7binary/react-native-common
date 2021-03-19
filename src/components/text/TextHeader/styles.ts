import { StyleSheet } from 'react-native';

import { Settings } from '@config/Settings';

export default StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: Settings.colors.accent,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
