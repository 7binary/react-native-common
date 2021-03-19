import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  images: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
    marginHorizontal: -6,
  },
  imageContainer: {
    width: '50%',
  },
  imageBox: {
    marginVertical: 4,
    display: 'flex',
    flexDirection: 'row',
  },
  fastimage: {
    borderWidth: 3,
    borderColor: 'transparent',
  },
  deleteIcon: {
    fontSize: 34,
    color: 'maroon',
    marginLeft: -26,
    marginTop: -18,
  },
});
