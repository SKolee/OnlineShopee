const bagReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BAG':
      const {id, title, price, image, quantity, bagtotal} = action.payload;
      const add = [...state, {id, title, price, image, quantity, bagtotal}];
      const addList = add.filter(
        (value, index, self) =>
          index === self.findIndex(t => t.id === value.id),
      );

      return addList;

    case 'REMOVE_ADDLIST':
      const removeAddList = state.filter(
        product => product.id !== action.payload.id,
      );
      return removeAddList;

    case 'INCREASE_COUNTER':
      const counterIncrease = state.map(product =>
        product.id === action.payload.id
          ? {...product, quantity: product.quantity + 1}
          : product,
      );

      // const priceIncrease = counterIncrease.map(product =>
      //   product.id === action.payload.id
      //     ? {...product, price: product.price}
      //     : product,
      // );

      return counterIncrease;

    case 'DECREASE_COUNTER':
      console.log('price', action.payload.price);
      const counterDecrease = state.map(product =>
        product.id === action.payload.id && product.quantity > 1
          ? {...product, quantity: product.quantity - 1}
          : product,
      );
      // const priceDecrease = counterDecrease.map(product =>
      //   product.id === action.payload.id
      //     ? {...product, price: product.price/2}
      //     : product,
      // );
      return counterDecrease;

    default:
      return state;
  }
};

export default bagReducer;
