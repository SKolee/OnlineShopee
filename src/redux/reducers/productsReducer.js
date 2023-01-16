import {combineReducers} from 'redux';
import bagReducer from './bagReducer';

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_WISHLIST':
      const {id, title, wish, price, image} = action.payload;
      const addList = [...state, {id, title, wish, price, image}];
      //console.log('reducer list',addList)
      return addList;

    case 'WISHLIST_TOGGLE':
      // console.log('AddList', state);
      const wishListToggle = state.map(product =>
        product.id === action.payload.id
          ? {...product, wish: !product.wish}
          : product,
      );

      //console.log('WishListToggle', wishListToggle);
      const newArray = wishListToggle.filter(
        (value, index, self) =>
          index === self.findIndex(t => t.id === value.id),
      );
      //console.log('New list',newArray)
      const wishList = newArray.filter(product => product.wish === true);
      //console.log('New list 1', wishList);
      return wishList;

    case 'REMOVE_WISHLIST':
      const removeWishList = state.filter(
        product => product.id !== action.payload.id,
      );
      return removeWishList;

    default:
      return state;
  }
};

const rootReducers = combineReducers({
  productsReducer,
  bagReducer,
});

export default rootReducers;
