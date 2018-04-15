import { ADD_DRAGON, REMOVE_DRAGON } from '../actions';

export default function(state = [], action) {
  switch(action.type) {
    case ADD_DRAGON:
      return [action.payload, ...state]
    case REMOVE_DRAGON:
      return state.filter(dragon => dragon.dragonId !== action.payload.dragonId);
    default:
      return state;
  }
}
