import { StyleSheet } from 'react-native';

import { Settings } from '@config/Settings';

export default StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: Settings.config.border.width,
    borderBottomColor: Settings.config.border.color,
    height: 60,
  },
  boxColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxIcon: {
    height: 60,
    lineHeight: 60,
    fontSize: 28,
    width: 28,
    color: '#444',
    marginRight: 12,
  },
  boxTitle: {
    fontSize: 20,
    height: 60,
    lineHeight: 60,
  },
  boxContext: {
    height: 60,
    lineHeight: 60,
    fontWeight: 'bold',
    fontSize: 22,
    marginRight: 5,
  },
  boxForward: {
    height: 60,
    lineHeight: 60,
    fontSize: 20,
    color: '#777',
    marginLeft: 10,
  },
  children: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
