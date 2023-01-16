import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
//Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Actions
import {removeWishList} from '../redux/actions/productsAction';
import {addToBag} from '../redux/actions/bagAction';

import EmptyWishlist from '../components/EmptyWishlist';

const WishListScreen = () => {
  const bagList = useSelector(state => state.bagReducer);
  const mappedBagList = bagList.map(product => product.id);

  const list = useSelector(state => state.productsReducer);
  const dispatch = useDispatch();
  return (
    <View style={styles.list}>
      <Text style={{fontSize: 24, color: '#20272D',alignSelf:'flex-start',margin:15,fontWeight:'bold'}}>Wishlist</Text>
      {list.length<=0 ? (
        <EmptyWishlist/>
      ) : (
        <FlatList
          data={list}
          keyExtractor={product => product.id}
          numColumns={2}
          renderItem={({item}) => {
            return (
              <View style={styles.listFrame}>
                <View style={styles.listContent}>
                  <Image
                    style={{
                      width: 170,
                      height: 190,
                      margin: 20,
                      borderRadius: 20,
                      resizeMode: 'stretch',
                    }}
                    source={{uri: `${item.image}`}}
                  />
                  <Text
                    numberOfLines={2}
                    style={{
                      color: 'grey',
                      fontWeight: '300',
                      paddingLeft: 12,
                      paddingBottom: 5,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      paddingLeft: 12,
                      fontWeight: '500',
                    }}>
                    ${item.price}
                  </Text>
                  <View style={styles.wishListIcon}>
                    <TouchableOpacity
                      onPress={() => dispatch(removeWishList(item.id))}>
                      <Entypo
                        name="trash"
                        size={25}
                        color="#20272D"
                        style={{margin: 5, marginLeft: 7}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        dispatch(
                          addToBag(item.id, item.title, item.price, item.image),
                        )
                      }>
                      <View style={styles.addtoBagStyle}>
                        <Ionicons
                          name={
                            mappedBagList.includes(item.id)
                              ? 'md-checkmark-sharp'
                              : 'md-cart'
                          }
                          size={25}
                          color="white"
                          style={{margin: 5, marginLeft: 7}}
                        />
                        {mappedBagList.includes(item.id) ? (
                          <Text style={{color: 'white'}}>Added to Cart</Text>
                        ) : (
                          <Text style={{color: 'white'}}>Add to Cart</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
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
  listFrame: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 340,
    width: 187,
  },
  listContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
    paddingBottom: 5,
  },
  addtoBagStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    marginLeft: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 140,
    height: 40,
    backgroundColor: '#20272D',
  },
  wishListIcon: {
    flexDirection: 'row',
    paddingRight: 8,

    width: 185,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 5,
  },
});

export default WishListScreen;
