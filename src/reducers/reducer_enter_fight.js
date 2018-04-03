import { ENTER_FIGHT } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case ENTER_FIGHT:
      return action.payload
    default: return state
  }
}
