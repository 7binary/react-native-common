import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    zIndex: 0,
    backgroundColor: 'beige',
  },
  image: {},
  actions: {
    position: 'absolute',
    zIndex: 10,
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    borderRadius: 0,
  },
  prevAction: {
    left: 5,
  },
  nextAction: {
    right: 5,
  },
  titleWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: '#AAA',
  },
  title: {
    color: '#EEE',
    fontSize: 16,
    textAlign: 'center',
  },
});
