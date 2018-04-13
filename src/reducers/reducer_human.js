import { SAVE_NEW_HUMAN, SPAWN_HUMAN, UPDATE_HUMAN_HP } from '../actions';

export default function (state={}, action) {
  switch(action.type) {
    case SPAWN_HUMAN:
      return action.payload.data.human
    case SAVE_NEW_HUMAN:
      return action.payload
    case UPDATE_HUMAN_HP:
      return action.payload
    default: return state;
  }
}
