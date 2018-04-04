import { CLEAR_MERGING_DRAGONS, MERGING_DRAGON } from '../actions';

export default function(state=[], action) {
  switch(action.type) {
    case MERGING_DRAGON:
      return [...state, action.payload];
    case CLEAR_MERGING_DRAGONS:
      return [];
    default:
      return state;
  }
}
