import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

const RailSelected = () => {
  return (
    <View style={styles.root} />
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 8,
    backgroundColor: 'rgba(23, 162, 96,0.8)',
    borderRadius: 2,
  },
});
