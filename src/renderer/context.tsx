/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer } from 'react';
import { dataReducer, responseReducer, toggleIsBulk } from './reducers';

const intialState = {
  data: [],
  responseData: [],
  isBulk: false,
};

const AppContext = createContext<{
  state: any;
  dispatch: React.Dispatch<any>;
}>({
  state: intialState,
  dispatch: () => null,
});

const mainReducer = ({ data, responseData, isBulk }: any, action: any) => ({
  isBulk: toggleIsBulk(isBulk, action),
  data: dataReducer(data, action),
  responseData: responseReducer(responseData, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, intialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
