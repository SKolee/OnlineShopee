export const addWishList = (id, title, price, image,category) => {
  return {
    type: 'ADD_WISHLIST',
    payload: {
      id,
      title,
      price,
      image,
      wish: false,
      category
    },
  };
};

export const wishlistToggle = id => {
  return {
    type: 'WISHLIST_TOGGLE',
    payload: {
      id,
    },
  };
};

export const removeWishList = id => {
  return {
    type: 'REMOVE_WISHLIST',
    payload: {
      id,
    },
  };
};


