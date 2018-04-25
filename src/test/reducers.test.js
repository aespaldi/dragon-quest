import reducerAllDragons from '../reducers/reducer_all_dragons';
import reducerDragons from '../reducers/reducer_dragons.js';
import reducerFightingDragon from '../reducers/reducer_fighting_dragon.js';
import reducerHuman from '../reducers/reducer_human.js';
import reducerMergingDragon from '../reducers/reducer_merging_dragons';
import * as types from '../actions';
import reducerNewDragon from '../reducers/reducer_new_dragon.js';
import reducerRandomDragon from '../reducers/reducer_random_dragon.js';

/*CODE_REVIEW: fakeDragonArray could contain fakeDragon (instead of duplicating)*/
const fakeDragonArray = [
  {
    type: 'red',
    level: 1,
    currenthp: 10,
    maxhp: 10,
    strength: 10,
    defense: 10,
    imageurl: 'fake.com/fake.png',
  }
];

const fakeDragon = {
  type: 'red',
  level: 1,
  currenthp: 10,
  maxhp: 10,
  strength: 10,
  defense: 10,
  imageurl: 'fake.com/fake.png',
};

const injuredDragon = Object.assign({}, fakeDragon, {currenthp: 5});

const fakeHuman = {
  type: 'whatever',
  level: 1,
  currenthp: 5,
  maxhp: 5,
  strength: 5,
  defense: 5,
  imageurl: 'fake.com/fake.png',
};

const injuredHuman = Object.assign({}, fakeHuman, {currenthp: 2});

const strongerHuman = Object.assign({}, fakeHuman, {currenthp: 10, maxhp: 10, strength: 10});


describe('all dragons reducer', () => {
  it('should return the initial state', () => {
    expect(reducerAllDragons(undefined, {})).toEqual([]);
  })
  it('should return an array with one dragon if a dragon is passed in', () => {
    expect(reducerAllDragons([], {
      type: types.GET_DRAGON_LIST,
      payload: fakeDragonArray,
      /*CODE_REVIEW: replace with .toEqual(fakeDragonArray)*/
    })).toEqual([
      {
        type: 'red',
        level: 1,
        currenthp: 10,
        maxhp: 10,
        strength: 10,
        defense: 10,
        imageurl: 'fake.com/fake.png',
      }
    ])
  });
});

describe('dragons reducer', () => {
  it('should return the initial state', () => {
    expect(reducerDragons(undefined, {})).toEqual([]);
  });

/*CODE_REVIEW: this is testing adding and removing to an empty array, but I would also test with an
array with some dragons in it to start - that way we know there isn't weird behaviour
like ADD_DRAGON replaces all dragons with the one we add or REMOVE_DRAGON creates an empty array
when we start with 3 dragons.  Also, what is expected from REMOVE_DRAGON if we try to remove a dragon
that isn't in there.*/
  it('should return an array with one additional dragon if case ADD_DRAGON is used', () => {
    expect(reducerDragons([], {
      type: types.ADD_DRAGON,
      payload: fakeDragon,
    })).toEqual([
      fakeDragon
    ])
  });
  it('should return an empty array if case REMOVE_DRAGON is passed in', () => {
    expect(reducerDragons(fakeDragonArray, {
      type: types.REMOVE_DRAGON,
      payload: fakeDragon,
    })).toEqual([])
  })
});

describe('fightingDragon reducer', () => {
  it('should return the initial state', () => {
    expect(reducerFightingDragon(undefined, {})).toEqual({})
  });
  it('should return an empty object if case CLEAR_FIGHTING_DRAGON is passed in', () => {
    expect(reducerFightingDragon(fakeDragon, {
      type: types.CLEAR_FIGHTING_DRAGON,
      payload: fakeDragon,
    })).toEqual({})
  });
  it('should change state to become the passed in dragon if FIGHTING_DRAGON is the type passed in', () => {
    expect(reducerFightingDragon({}, {
      type: types.FIGHTING_DRAGON,
      payload: fakeDragon
    })).toEqual(fakeDragon);
  });
/* CODE_REVIEW: This test is ok, but I wonder about the UPDATE_DRAGON_HP reducer - should it be passed
an entire new dragon or just the HP for the exisitng dragon? (Let's discuss the gaming logic)
As written, it doesn't consider the unhappy path of where something other than the HP is changed
*/
  it('should change the hp of the fightingDragon in state if UPDATE_DRAGON_HP is the type passed in', () => {
    expect(reducerFightingDragon(fakeDragon, {
      type: types.UPDATE_DRAGON_HP,
      payload: injuredDragon,
    })).toEqual(injuredDragon);
  });
});

describe('reducerHuman', () => {
  it('should return the initial state', () => {
    expect(reducerHuman(undefined, {})).toEqual({})
  });
  it('should change state to become the passed in human if SPAWN_HUMAN is the type passed in', () => {
    expect(reducerHuman({}, {
      type: types.SPAWN_HUMAN,
      payload: fakeHuman
    })).toEqual(fakeHuman);
  });
  it('should replace the current human in state with the updated version when type SAVE_NEW_HUMAN is passed in', () => {
    expect(reducerHuman(fakeHuman, {
      type: types.SAVE_NEW_HUMAN,
      payload: strongerHuman,
    })).toEqual(strongerHuman);
  });
  it('should replace the current human in state with the updated version when type UPDATE_HUMAN_HP is passed in', () => {
    expect(reducerHuman(fakeHuman, {
      type: types.UPDATE_HUMAN_HP,
      payload: injuredHuman,
    })).toEqual(injuredHuman);
  });
});

/*CODE_REVIEW Is the mergingDragons array always empty before merging? If not, test with an array with dragons in it already*/
describe('reducerMergingDragon', () => {
  it('should return the initial state', () => {
    expect(reducerHuman(undefined, {})).toEqual({});
  });
  it('should add a dragon to the mergingDragons array when type MERGING_DRAGON is passed in and the array is empty', () => {
    expect(reducerMergingDragon([], {
      type: types.MERGING_DRAGON,
      payload: fakeDragon,
    })).toEqual([
      fakeDragon
    ]);
  });
  it('should add a dragon to the mergingDragons array when type MERGING_DRAGON is passed in and the array has one item already', () => {
    expect(reducerMergingDragon([
      injuredDragon], {
        type: types.MERGING_DRAGON,
        payload: fakeDragon,
      })).toEqual([injuredDragon, fakeDragon]);
  });
  it('should clear all dragons from the mergingDragons array when type CLEAR_MERGING_DRAGONS is passed in', () => {
    expect(reducerMergingDragon([injuredDragon, fakeDragon], {
      type: types.CLEAR_MERGING_DRAGONS,
    })).toEqual([]);
  });
});

/*CODE_REVIEW: typo? SAVE_NEW_DRAGON*/
describe('reducerNewDragon', () => {
  it('should return the initial state', () => {
    expect(reducerNewDragon(undefined, {})).toEqual({});
  });
  it('should save a new dragon to the state when type SAVE_NEW_HUMAN is passed in', () => {
    expect(reducerNewDragon({}, {
      type: types.SAVE_NEW_DRAGON,
      payload: fakeDragon,
    })).toEqual(fakeDragon);
  });
  it('should clear the dragon from state if type CLEAR_NEW_DRAGON is passed in', () => {
    expect(reducerNewDragon(fakeDragon, {
      type: types.CLEAR_NEW_DRAGON,
    })).toEqual({});
  });
});

describe('reducerRandomDragon', () => {
  it('should return the initial state', () => {
    expect(reducerRandomDragon(undefined, {})).toEqual({});
  });
  it('should clear the random dragon from state if type CLEAR_RANDOM_DRAGON is passed in', () => {
    expect(reducerRandomDragon(fakeDragon, {
      type: types.CLEAR_RANDOM_DRAGON,
    })).toEqual({});
  });
  it('should add the random dragon to state if type GET_RANDOM_DRAGON is passed in', () => {
    expect(reducerRandomDragon({}, {
      type: types.GET_RANDOM_DRAGON,
      payload: fakeDragon,
    })).toEqual(fakeDragon);
  });
});
