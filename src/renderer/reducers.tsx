// Data

export const dataReducer = (state: any[], action: any) => {
  switch (action.type) {
    case 'isBulk':
      return [...action.payload];
    default:
      return state;
  }
};

// ShoppingCart

export const responseReducer = (state: number, action: any) => {
  switch (action.type) {
    case 'appendResponse':
      return [...action.payload];
    default:
      return state;
  }
};
