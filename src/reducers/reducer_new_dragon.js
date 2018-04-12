import { CLEAR_NEW_DRAGON, SAVE_NEW_DRAGON } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case SAVE_NEW_DRAGON:
      return action.payload;
    case CLEAR_NEW_DRAGON:
      return {};
    default: return state
  }
}
