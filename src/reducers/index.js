import { combineReducers } from 'redux';
import DragonsReducer from './reducer_dragons';
import RandomDragonReducer from './reducer_random_dragon';
import EnterFightModeReducer from './reducer_enter_fight';
import FightingDragonReducer from './reducer_fighting_dragon';
import HumanReducer from './reducer_human';
import MergingDragonsReducer from './reducer_merging_dragons';
import AllDragonsReducer from './reducer_all_dragons';
import DragonLevelUpOptionsReducer from './reducer_dragon_options';
import shinyNewDragonReducer from './reducer_new_dragon';

const rootReducer = combineReducers({
  allDragonsForLevel: AllDragonsReducer,
  dragons: DragonsReducer,
  dragonOptions: DragonLevelUpOptionsReducer,
  fightMode: EnterFightModeReducer,
  fightingDragon: FightingDragonReducer,
  human: HumanReducer,
  mergingDragons: MergingDragonsReducer,
  randomDragon: RandomDragonReducer,
  shinyNewDragon: shinyNewDragonReducer,
});

export default rootReducer;
