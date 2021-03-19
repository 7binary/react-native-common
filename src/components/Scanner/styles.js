import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controls: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backBtn: {
    opacity: 0.5,
  },
  scanIcon: {
    color: 'white',
    fontSize: 240,
    opacity: 0.1,
    marginLeft: 15,
  },
});
