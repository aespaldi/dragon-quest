import { SAVE_NEW_HUMAN, SPAWN_HUMAN, UPDATE_HUMAN_HP } from '../actions';

export default function (state={}, action) {
  switch(action.type) {
    case SPAWN_HUMAN:
      console.log('SPAWN_HUMAN payload:', action.payload)
      console.log('SPAWN_HUMAN state:', state)
      return action.payload
    case SAVE_NEW_HUMAN:
      return action.payload
    case UPDATE_HUMAN_HP:
      return action.payload
    default: return state;
  }
}
