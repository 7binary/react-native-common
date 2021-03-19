import { StyleSheet } from 'react-native';

import { Settings } from '@config/Settings';

export default StyleSheet.create({
  container: {
    backgroundColor: '#E1E1E1',
  },
  titleBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#E1E1E1',
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomColor: Settings.config.border.color,
    borderBottomWidth: Settings.config.border.width,
  },
  titleIcon: {
    fontSize: 24,
    marginRight: 10,
    color: Settings.colors.primary,
  },
  titleColumn: {
    flexDirection: 'row',
    maxWidth: '90%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  forwardIcon: {
    fontSize: 20,
    color: '#999',
  },
  subtitle: {
    alignSelf: 'stretch',
    textAlign: 'justify',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  date: {
    alignSelf: 'stretch',
    textAlign: 'right',
    fontSize: 12,
    color: 'gray',
    paddingHorizontal: 10,
  },
});
