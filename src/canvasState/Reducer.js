export const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE';
export const UPDATE_BACKGROUND = 'UPDATE_BACKGROUND';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export default function Reducer(state, action) {
  switch (action.type) {
    case UPDATE_TEMPLATE:
      return action.payload;
    case UPDATE_BACKGROUND:
      console.log(action.payload);
      return {
        ...state,
        backgroundImage: {...state.backgroundImage, ...action.payload},
      };
    case UPDATE_POSITION:
      var {id, x, y} = action.payload;
      state.components[id].position.x = x;
      state.components[id].position.y = y;
      return {...state};
    default:
      return;
  }
}
