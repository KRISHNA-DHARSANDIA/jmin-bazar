import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';


const Thumb = () => {
  return (<View style={styles.rootLow} />);
};

const styles = StyleSheet.create({
  rootLow: {
    width: 10 * 2,
    height: 10 * 2,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#eeeeee',
    backgroundColor: '#00b875',
  },
});

export default memo(Thumb);
