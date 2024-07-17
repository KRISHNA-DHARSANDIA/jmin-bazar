import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Label = ({ text, ...restProps }) => {
  return (
    <View style={{ height: 40 }}>
      {text !== -1 && text !== 101 &&
        <View style={styles.root} {...restProps}>
          <Text style={styles.text}>{'INR ' + text}</Text>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
});

export default memo(Label);
