import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const commonStyles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default commonStyles;
