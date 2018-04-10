import { ADD_DRAGON, REMOVE_DRAGON } from '../actions';

export default function(state = [], action) {
  switch(action.type) {
    case ADD_DRAGON:
      return [...state, action.payload]
    case REMOVE_DRAGON:
      return [...state.slice(action.payload, 1)];
    default:
      return state;
  }
}
