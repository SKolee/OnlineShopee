import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import EmptyBag from '../components/EmptyBag';
import {
  counterDecrease,
  counterIncrease,
  removeAddList,
} from '../redux/actions/bagAction';

const BagScreen = () => {
  const [cartTotal, setCartTotal] = useState();
  const [noofItems, setNoofItems] = useState();
  const cart = useSelector(state => state.bagReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTotal();
  }, [cart]);

  const getTotal = () => {
    const prices = cart.map(product => product.price);
    let sum = prices.reduce((total, item) => total + item, 0).toFixed(2);
    let length = prices.length;
    setCartTotal(sum);
    setNoofItems(length);
  };

  return (
    <View style={styles.mainViewStyle}>
      <Text
        style={{
          fontSize: 24,
          color: '#20272D',
          alignSelf: 'flex-start',
          margin: 15,
          fontWeight: 'bold',
        }}>
        Cart
      </Text>
      {cart.length <= 0 ? (
        <EmptyBag />
      ) : (
        <View style={styles.mainViewStyle}>
          <FlatList
            data={cart}
            keyExtractor={product => product.id}
            renderItem={({item}) => {
              return (
                <View style={styles.list}>
                  <View style={styles.listContent}>
                    <View style={styles.productDetails}>
                      <Image
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: 20,
                          resizeMode: 'stretch',
                        }}
                        source={{uri: `${item.image}`}}
                      />
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 17,
                            marginLeft: 7,
                            fontWeight: '400',
                          }}
                          numberOfLines={1}>
                          {item.title}
                        </Text>

                        <Text
                          style={{
                            color: '#00ff55',
                            fontSize: 15,
                            fontWeight: '700',
                            margin: 7,
                          }}>
                          ${item.price}
                        </Text>

                        <View style={styles.counterStyle}>
                          <TouchableOpacity
                            onPress={
                              item.quantity === 1
                                ? null
                                : () =>
                                    dispatch(
                                      counterDecrease(item.id, item.price),
                                    )
                            }>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 17,
                                fontWeight: '500',
                              }}>
                              -
                            </Text>
                          </TouchableOpacity>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 15,
                              fontWeight: '500',
                            }}>
                            {item.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              dispatch(counterIncrease(item.id, item.price))
                            }>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 17,
                                fontWeight: '500',
                              }}>
                              +
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={{alignSelf: 'flex-end', marginRight: 3}}>
                      <TouchableOpacity
                        onPress={() => dispatch(removeAddList(item.id))}>
                        <Text
                          style={{
                            color: '#99d6ff',
                            fontSize: 15,
                            flex: 1,
                            marginLeft: 7,
                            fontWeight: 'bold',
                          }}>
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <View style={styles.totalStyle}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '700',
                margin: 4,
              }}>
              No of Items: {noofItems}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '700',
                margin: 4,
              }}>
              Total of Cart: ${cartTotal}
            </Text>
            <TouchableOpacity>
              <View style={styles.payStyle}>
                <Text
                  style={{
                    color: '#009933',
                    fontSize: 18,
                    fontWeight: 'bold',
                    margin: 4,
                  }}>
                  Proceed to pay
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 3,
  },
  listContent: {
    flexDirection: 'column',
    margin: 2,
    alignItems: 'flex-start',
    padding: 5,
    width: 350,
    height: 140,
    backgroundColor: '#556777',
    borderRadius: 8,
  },
  productDetails: {
    flexDirection: 'row',
    width: 335,
    height: 110,
  },
  counterStyle: {
    flexDirection: 'row',

    width: 80,
    justifyContent: 'space-evenly',
  },
  totalStyle: {
    borderRadius: 6,
    alignSelf: 'center',
    width: 380,
    height: 100,
    backgroundColor: '#35404b',
  },
  mainViewStyle: {
    flex: 2,
    padding: 3,
  },
  payStyle: {
    marginRight: 6,
    width: 140,
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 6,
    backgroundColor: '#20272d',
    padding: 2,
  },
});

export default BagScreen;
