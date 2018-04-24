import reducerAllDragons from '../reducers/reducer_all_dragons';
import reducerDragons from '../reducers/reducer_dragons.js';
import reducerFightingDragon from '../reducers/reducer_fighting_dragon.js';
import reducerHuman from '../reducers/reducer_human.js';
import * as types from '../actions';

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
