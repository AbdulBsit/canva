export const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE';
export const UPDATE_BACKGROUND = 'UPDATE_BACKGROUND';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const UPDATE_COLOR = 'UPDATE_COLOR';
export const UPDATE_FONT_STYLE = 'UPDATE_FONT_STYLE';

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
    case UPDATE_COLOR:
      return {
        ...state,
        style: {...state.style, backgroundColor: action.payload},
      };
    case UPDATE_POSITION:
      var {id, x, y} = action.payload;
      state.components[id].position.x = x;
      state.components[id].position.y = y;
      return {...state};
    case UPDATE_FONT_STYLE:
      var {id, value} = action.payload;

      var newState = {
        ...state,
        components: Object.assign(
          {},
          ...Object.keys(state.components).map((key, index, array) => {
            if (key === id) {
              state.components[key].style = {
                ...state.components[key].style,
                ...value,
              };
              return {[key]: state.components[key]};
            } else {
              return {[key]: state.components[key]};
            }
          }),
        ),
      };
      return newState;
    default:
      return;
  }
}
