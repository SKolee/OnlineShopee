export const addToBag = (id, title, price, image,bagtotal) => {
  return {
    type: 'ADD_BAG',
    payload: {
      id,
      title,
      price,
      image,
      quantity: 1,
      bagtotal:[]
    },
  };
};

export const removeAddList = id => {
  return {
    type: 'REMOVE_ADDLIST',
    payload: {
      id,
    },
  };
};
export const counterIncrease = (id, price) => {
  return {
    type: 'INCREASE_COUNTER',
    payload: {
      id,
      price,
    },
  };
};
export const counterDecrease = (id, price) => {
  return {
    type: 'DECREASE_COUNTER',
    payload: {
      id,
      price,
    },
  };
};

export const getTotal = () => {
  return {type: 'GET_TOTAL'};
};
