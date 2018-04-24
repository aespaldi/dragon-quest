import { GET_DRAGON_LIST } from '../actions';

export default function reducerAllDragons(state=[], action) {
  switch(action.type) {
    case GET_DRAGON_LIST:
      return action.payload
    default: return state;
  }
}
