import { combineReducers } from 'redux';
import DragonsReducer from './reducer_dragons';
import RandomDragonReducer from './reducer_random_dragon';
import EnterFightModeReducer from './reducer_enter_fight';
import FightingDragonReducer from './reducer_fighting_dragon';
import HumanReducer from './reducer_human';
import MergingDragonsReducer from './reducer_merging_dragons';

const rootReducer = combineReducers({
  dragons: DragonsReducer,
  fightMode: EnterFightModeReducer,
  fightingDragon: FightingDragonReducer,
  human: HumanReducer,
  mergingDragons: MergingDragonsReducer,
  randomDragon: RandomDragonReducer,
});

export default rootReducer;
