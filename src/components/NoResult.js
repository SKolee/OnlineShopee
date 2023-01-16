import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NoResult = () => {
  return (
    <View style={styles.resultStyle}>
      <MaterialCommunityIcons name="magnify-close" size={80} color="#4a5a68" />
      <Text style={{fontSize: 40, color: '#20272D'}}>No results found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default NoResult;
