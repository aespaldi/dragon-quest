import configureStore from 'redux-mock-store';
import promise from 'redux-promise';

import { callHuman, getAllDragons, getRandomDragon, addToUserDragons, clearFightingDragon, clearMergingDragons,
clearNewDragon, clearRandomDragon, enterFightMode, mergingDragon, removeFromUserDragons, saveDragon, saveHuman, updateHuman, updateDragon } from '../actions';

const middlewares = [promise];
const mockStore = configureStore(middlewares);

const testDragon = {
  type: 'red',
  level: 1,
  currenthp: 10,
  maxhp: 10,
  strength: 10,
  defense: 10,
  imageurl: 'fake.com/fake.png',
}

const testHuman = {
  type: 'whatever',
  level: 1,
  currenthp: 5,
  maxhp: 5,
  strength: 5,
  defense: 5,
  imageurl: 'fake.com/fake.png',
}

describe('callHuman', () => {
  // will come back and do the mock tests later.
})

describe('getAllDragons', () => {
  // will come back and do the mock tests later.
})

describe('getRandomDragon', () => {
  // will come back and do the mock tests later.
})

describe('clearFightingDragon', () => {
  test('it returns an object with a property of type', () => {
    expect(clearFightingDragon()).toMatchObject({type: expect.anything()})
  })
});

describe('clearMergingDragons', () => {
  test('it returns an object with a property of type', () => {
    expect(clearMergingDragons()).toMatchObject({type: expect.anything()})
  });
});

describe('clearNewDragon', () => {
  test('it returns an object with a property of type', () => {
    expect(clearNewDragon()).toMatchObject({type: expect.anything()})
  });
});

describe('clearRandomDragon', () => {
  test('it returns an object with a property of type', () => {
    expect(clearRandomDragon()).toMatchObject({type: expect.anything()})
  });
});

describe('enterFightMode', () => {
  test('it returns an object with the properties of type and payload', () => {
    expect(enterFightMode(testDragon)).toMatchObject(
      {
        type: expect.anything(),
        payload: expect.objectContaining(testDragon)
      })
  });
});

describe('mergingDragon', () => {
  test('it returns an object with the properties of type and payload', () => {
    expect(mergingDragon(testDragon)).toMatchObject(
      {
        type: expect.anything(),
        payload: expect.objectContaining(testDragon)
      })
  });
});

describe('removeFromUserDragons', () => {
  test('it returns an object with the properties of type and payload', () => {
    expect(removeFromUserDragons(testDragon)).toMatchObject(
      {
        type: expect.anything(),
        payload: expect.objectContaining(testDragon)
      })
  });
});

describe('saveDragon', () => {
  test('it returns an object with the properties of type and payload', () => {
    expect(saveDragon(testDragon)).toMatchObject(
      {
        type: expect.anything(),
        payload: expect.objectContaining(testDragon)
      })
  });
});

describe('saveHuman', () => {
  test('it returns an object with the properties of type and payload', () => {
    expect(saveHuman(testHuman)).toMatchObject(
      {
        type: expect.anything(),
        payload: expect.objectContaining(testHuman)
      })
  });
});

describe('updateHuman', () => {
  test('it returns an object with the properties of type and payload', () => {
    expect(updateHuman(testHuman)).toMatchObject(
      {
        type: expect.anything(),
        payload: expect.objectContaining(testHuman)
      })
  });
});

describe('updateDragon', () => {
  test('it returns an object with the properties of type and payload', () => {
    expect(updateDragon(testDragon)).toMatchObject(
      {
        type: expect.anything(),
        payload: expect.objectContaining(testDragon)
      })
  });
});
