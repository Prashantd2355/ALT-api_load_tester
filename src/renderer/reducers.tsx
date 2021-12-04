// Data

export const dataReducer = (state: any[], action: any) => {
  switch (action.type) {
    case 'isBulk':
      return [...action.payload];
    default:
      return state;
  }
};

// responseReducer

export const responseReducer = (state: number, action: any) => {
  switch (action.type) {
    case 'appendResponse':
      return [...action.payload];
    default:
      return state;
  }
};

export const toggleIsBulk = (state: number, action: any) => {
  switch (action.type) {
    case 'isBulkTrue':
      return true;
    case 'isBulkFalse':
      return false;
    default:
      return state;
  }
};
