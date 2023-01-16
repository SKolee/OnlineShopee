import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addWishList, wishlistToggle} from '../redux/actions/productsAction';

//Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/core';
import {categories} from '../components/categories';

import NoResult from '../components/NoResult';
import Loading from '../components/Loading';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const list = useSelector(state => state.productsReducer);
  const mappedList = list.map(product => product.id);

  const [products, setProducts] = useState();
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [catActive, setCatActive] = useState(categories);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const url = `https://fakestoreapi.com/products`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async categoryName => {
    try {
      const url =
        categoryName === 'All'
          ? `https://fakestoreapi.com/products`
          : `https://fakestoreapi.com/products/category/${categoryName}`;
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchFilter = text => {
    if (text) {
      const newData = products.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setProducts(newData);
      setErrorMessage(newData);
    } else {
      setProducts(products);
    }
  };

  

  return (
    <View style={styles.list}>
      <View style={styles.headerStyle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 20, color: 'white'}}>S h o p e e</Text>
          <Ionicons
            name={'md-cart'}
            size={20}
            color="white"
            style={{paddingTop: 5, paddingLeft: 7}}
          />
        </View>
      </View>

      <View style={styles.searchStyle}>
        {input ? (
          <Pressable
            onPress={() => {
              getProducts();
              setInput('');
            }}>
            <AntDesign
              name="arrowleft"
              size={20}
              color="#4a5a68"
              style={{marginLeft: 9}}
            />
          </Pressable>
        ) : (
          <AntDesign
            name="search1"
            size={20}
            color="#4a5a68"
            style={{marginLeft: 9}}
          />
        )}

        <TextInput
          value={input}
          style={styles.inputStyle}
          placeholder="Search Products... "
          placeholderTextColor="#6a8195"
          onChangeText={text => {
            setInput(text);
            searchFilter(input);
          }}
          autoComplete="off"
        />
      </View>

      <View style={styles.categoryListStyle}>
        <FlatList
          data={categories}
          keyExtractor={category => category.catName}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => getCategories(item.catName)}>
                <View style={styles.categoryStyle}>
                  <Text style={{color: 'black'}}>{item.catName}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {!products ? <Loading /> : null}
      {errorMessage.length < 1 && input ? <NoResult /> : null}

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={product => product.id}
        renderItem={({item}) => {
          return (
            <View style={styles.listFrame}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('HomeScreenDetails', {itemData: item})
                }>
                <View style={styles.listContent}>
                  <ImageBackground
                    style={{
                      width: 170,
                      height: 200,
                      margin: 20,
                    }}
                    imageStyle={{
                      borderRadius: 20,
                    }}
                    resizeMode="stretch"
                    source={{uri: `${item.image}`}}>
                    <View style={styles.buttonsStyle}>
                      <View style={styles.iconStyle}>
                        <Pressable
                          onPress={() => {
                            dispatch(
                              addWishList(
                                item.id,
                                item.title,
                                item.price,
                                item.image,
                              ),
                            );
                            dispatch(wishlistToggle(item.id));
                          }}>
                          <AntDesign
                            name={
                              mappedList.includes(item.id) ? 'heart' : 'hearto'
                            }
                            size={25}
                            //style={{paddingLeft: 8, paddingBottom: 5}}
                            color={
                              mappedList.includes(item.id) ? '#ff0066' : 'white'
                            }
                          />
                        </Pressable>
                      </View>
                    </View>
                  </ImageBackground>

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
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
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
    height: 300,
    width: 187,
  },
  listContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'baseline',
    paddingBottom: 5,
  },
  buttonsStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  iconStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#35404b',
  },
  categoryStyle: {
    margin: 5,
    height: 30,
    padding: 3,
    borderRadius: 9,
    backgroundColor: '#d2d9df',
  },
  categoryListStyle: {
    flexDirection: 'row',
    height: 40,
  },
  searchStyle: {
    flexDirection: 'row',

    borderRadius: 18,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 3,
    backgroundColor: '#d2d9df',
  },
  inputStyle: {
    marginLeft: 5,
    fontSize: 15,
    flex: 2,
    color: '#4a5a68',
  },
  headerStyle: {
    height: 30,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#20272D',
  },
});

export default HomeScreen;
