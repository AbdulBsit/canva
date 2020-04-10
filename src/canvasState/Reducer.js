export const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE';
export default function Reducer(state, action) {
  switch (action.type) {
    case UPDATE_TEMPLATE:
      return action.payload;
    default:
      return;
  }
}
