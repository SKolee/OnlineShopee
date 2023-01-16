import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

//Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Actions
import {addWishList, wishlistToggle} from '../redux/actions/productsAction';
import {addToBag} from '../redux/actions/bagAction';
import ImageViewer from 'react-native-image-zoom-viewer';

const HomeScreenDetails = ({route}) => {
  const dispatch = useDispatch();
  const {itemData} = route.params;

  const wishList = useSelector(state => state.productsReducer);
  const mappedWishList = wishList.map(product => product.id);

  const bagList = useSelector(state => state.bagReducer);
  const mappedBagList = bagList.map(product => product.id);

  let productRating = Math.round(itemData.rating.rate);

  const [rating, setRating] = useState(productRating);
  const [maxrating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const [visible, setVisible] = useState(false);
  const images = [
    {
      url: `${itemData.image}`,
    },
  ];

  const starImgFilled =
    'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
  const starImgCorner =
    'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';

  const RatingBar = () => {
    return (
      <View style={styles.ratingStyle}>
        {maxrating.map((item, key) => {
          return (
            <View key={item}>
              <Image
                style={styles.starStyle}
                source={
                  item <= rating ? {uri: starImgFilled} : {uri: starImgCorner}
                }
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.descriptionStyle}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            style={{
              width: 340,
              height: 350,
              alignSelf: 'center',
            }}
            resizeMode="stretch"
            source={{uri: `${itemData.image}`}}
          />

          <Modal visible={visible} transparent={true}>
            <View style={styles.modalBackground}>
              <View style={styles.modalView}>
                <View style={{paddingRight: 4, paddingTop: 4}}>
                  <Pressable onPress={() => setVisible(false)}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                      }}>
                      x
                    </Text>
                  </Pressable>
                </View>
                <View style={{width: '100%', height: '100%'}}>
                  <ImageViewer imageUrls={images} />
                </View>
              </View>
            </View>
          </Modal>
        </TouchableOpacity>

        <Text
          style={{
            color: '#35404b',
            fontSize: 20,
            fontWeight: '700',
            paddingTop: 5,
          }}>
          {itemData.title}
        </Text>
        <Text
          style={{
            color: '#35404b',
            fontSize: 20,
            fontWeight: '700',
            paddingTop: 5,
          }}>
          Product Description:
        </Text>
        <Text style={{color: '#35404b', fontSize: 17, fontWeight: '40'}}>
          {itemData.description}
        </Text>

        <Text
          style={{
            color: '#009933',
            fontSize: 25,
            fontWeight: '700',
            paddingTop: 5,
          }}>
          $ {itemData.price}
        </Text>

        <Text
          style={{
            color: '#35404b',
            fontSize: 20,
            fontWeight: '700',
            paddingTop: 5,
          }}>
          Rating
        </Text>
        <RatingBar />
      </ScrollView>

      <View style={styles.bottomStyle}>
        <Pressable
          onPress={() => {
            dispatch(
              addWishList(
                itemData.id,
                itemData.title,
                itemData.price,
                itemData.image,
              ),
            );
            dispatch(wishlistToggle(itemData.id));
          }}
          style={styles.bottomButtonStyle}>
          <View
            style={[
              styles.bottomButtonStyle,
              {borderRightWidth: 0.8, borderRightColor: '#8899aa'},
            ]}>
            <Text style={styles.bottomTextStyle}>WishList</Text>
            <AntDesign
              name={mappedWishList.includes(itemData.id) ? 'heart' : 'hearto'}
              size={20}
              style={{paddingLeft: 12}}
              color={mappedWishList.includes(itemData.id) ? '#ff0066' : 'white'}
            />
          </View>
        </Pressable>

        <Pressable
          onPress={() =>
            dispatch(
              addToBag(
                itemData.id,
                itemData.title,
                itemData.price,
                itemData.image,
              ),
            )
          }
          style={styles.bottomButtonStyle}>
          <View>
            {mappedBagList.includes(itemData.id) ? (
              <Text style={styles.bottomTextStyle}>Added to Cart</Text>
            ) : (
              <Text style={styles.bottomTextStyle}>Add to Cart</Text>
            )}
          </View>
          <Ionicons
            name={
              mappedBagList.includes(itemData.id)
                ? 'md-checkmark-sharp'
                : 'md-cart'
            }
            size={20}
            color="white"
            style={{paddingLeft: 7}}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingStyle: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  starStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  descriptionStyle: {
    margin: 10,
    flex: 1,
  },
  bottomStyle: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
  },
  bottomButtonStyle: {
    flexDirection: 'row',
    backgroundColor: '#35404b',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomTextStyle: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  modalBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
});

export default HomeScreenDetails;
