import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 0,
    height: 48,
    marginLeft: -8,
  },
  row: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {},
  label: {
    flex: 1,
    flexWrap: 'wrap',
  },
  link: {
    textDecorationLine: 'underline',
  },
  dialogScrollview: {
    paddingVertical: 40,
    paddingHorizontal: 5,
  },
  dialogActions: {
    borderTopWidth: 0.5,
    borderTopColor: '#BBB',
    paddingBottom: 60,
  }
});
