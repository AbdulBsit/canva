import React, {createContext, useReducer} from 'react';

import reducer from './Reducer';

const CanvasContext = createContext();

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
    backgroundImage: '',
    borderWidth: 0,
    borderColor: '#000000',
    borderRadius: 0,
    components: [
      {
        type: 'text',
        style: {
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
        },
        position: {x: '50%', y: '50%'},
        value: ' I am Centered',
      },
      {
        type: 'image',
        style: {
          width: '30%',
          height: '30%',
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
        },
        position: {x: '50%', y: '50%'},
        uri:
          'https://static-news.moneycontrol.com/static-mcnews/2019/01/uri-770x433.jpg',
      },
    ],
  });

  return (
    <CanvasContext.Provider value={[state, dispatch]} children={children} />
  );
};

export {CanvasContext, StateProvider};
