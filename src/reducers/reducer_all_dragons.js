import { GET_DRAGON_LIST } from '../actions';

export default function(state=[], action) {
  switch(action.type) {
    case GET_DRAGON_LIST:
      return action.payload
    default: return state;
  }
}
