import { SAVE_NEW_DRAGON } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case SAVE_NEW_DRAGON:
      return action.payload;
    default: return state
  }
}
