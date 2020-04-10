import React from 'react';

import {UPDATE_TEMPLATE, UPDATE_BACKGROUND, UPDATE_POSITION} from './Reducer';
import {CanvasContext} from './Store';
export default function useActions() {
  const [state, dispatch] = React.useContext(CanvasContext);

  return {
    loadTemplate: function(data) {
      dispatch({type: UPDATE_TEMPLATE, payload: data});
    },
    setPosition: function(id, x, y) {
      dispatch({type: UPDATE_POSITION, payload: {id, x, y}});
    },
    updateTemplate: function(data) {
      dispatch({type: UPDATE_TEMPLATE, payload: data});
    },
    editBackgroundImage: function(uri) {
      dispatch({type: UPDATE_BACKGROUND, payload: {uri}});
    },
  };
}
