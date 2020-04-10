import React, {createContext, useReducer} from 'react';

import Reducer from './Reducer';

const CanvasContext = createContext();

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, {
    backgroundImage: {
      uri: null,
      resizeMode: 'contain',
      style: {flex: 1},
    },
    style: {
      height: '100%',
      width: '100%',
      zIndex: 99,
      backgroundColor: 'lightgreen',
      borderColor: '#000000',
    },
    components: {},
  });
  return (
    <CanvasContext.Provider value={[state, dispatch]} children={children} />
  );
};

export {CanvasContext, StateProvider};
