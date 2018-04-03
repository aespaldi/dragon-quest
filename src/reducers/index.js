import { combineReducers } from 'redux';
import DragonsReducer from './reducer_dragons';
import RandomDragonReducer from './reducer_random_dragon';
import EnterFightModeReducer from './reducer_enter_fight';
import FightingDragonReducer from './reducer_fighting_dragon';
import HumanReducer from './reducer_human';

const rootReducer = combineReducers({
  dragons: DragonsReducer,
  randomDragon: RandomDragonReducer,
  fightMode: EnterFightModeReducer,
  fightingDragon: FightingDragonReducer,
  human: HumanReducer,
});

export default rootReducer;
