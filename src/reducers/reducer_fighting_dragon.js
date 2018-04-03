import { FIGHTING_DRAGON, UPDATE_DRAGON_HP, GET_RANDOM_DRAGON } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case FIGHTING_DRAGON:
      return action.payload
    case UPDATE_DRAGON_HP:
      return action.payload
    default: return state
  }
}
