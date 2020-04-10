import React from 'react';

import {UPDATE_TEMPLATE} from './Reducer';
import {CanvasContext} from './Store';
export default function useActions() {
  const [state, dispatch] = React.useContext(CanvasContext);

  return {
    loadTemplate: function(data) {
      dispatch({type: UPDATE_TEMPLATE, payload: data});
    },
    setPosition: function(id, x, y) {
      state.components[id].position.x = x;
      state.components[id].position.y = y;
      dispatch({type: UPDATE_TEMPLATE, payload: state});
    },
    updateTemplate: function(data) {
      dispatch({type: UPDATE_TEMPLATE, payload: data});
    },
  };
}
