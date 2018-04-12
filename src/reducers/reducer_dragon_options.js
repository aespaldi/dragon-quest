import { DRAGON_BY_ID } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case DRAGON_BY_ID:
      return action.payload.data;
    default: return state
  }
}
