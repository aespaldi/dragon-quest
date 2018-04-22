import { CLEAR_RANDOM_DRAGON, GET_RANDOM_DRAGON } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case CLEAR_RANDOM_DRAGON:
      return {}
    case GET_RANDOM_DRAGON:
      return action.payload.data.randomDragon
    default: return state;
  }
}
