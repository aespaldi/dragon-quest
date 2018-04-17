import { combineReducers } from 'redux';
import AllDragonsReducer from './reducer_all_dragons';
import DragonsReducer from './reducer_dragons';
import EnterFightModeReducer from './reducer_enter_fight';
import FightingDragonReducer from './reducer_fighting_dragon';
import HumanReducer from './reducer_human';
import MergingDragonsReducer from './reducer_merging_dragons';
import RandomDragonReducer from './reducer_random_dragon';
import ShinyNewDragonReducer from './reducer_new_dragon';

const rootReducer = combineReducers({
  allDragons: AllDragonsReducer,
  dragons: DragonsReducer,
  fightMode: EnterFightModeReducer,
  fightingDragon: FightingDragonReducer,
  human: HumanReducer,
  mergingDragons: MergingDragonsReducer,
  randomDragon: RandomDragonReducer,
  shinyNewDragon: ShinyNewDragonReducer,
});

export default rootReducer;
