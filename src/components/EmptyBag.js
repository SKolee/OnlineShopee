import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Entypo from 'react-native-vector-icons/Entypo';

const EmptyBag = () => {
  return (
    <View style={styles.messageStyle}>
      <Text style={{fontSize: 30, color: '#8899aa', fontWeight: '500'}}>
        Your Cart is Empty
      </Text>
      <View style={styles.iconStyle}>
        <Entypo name="shopping-cart" size={80} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    width: 130,
    margin: 20,
    borderRadius: 170,
    backgroundColor: '#8899aa',
    marginTop: 22,
  },
  messageStyle: {
    marginTop: 90,
    alignItems: 'center',
    width: '100%',
  },
});

export default EmptyBag;
