import React from 'react';
import ReactDOM from 'react-dom';
import { chooseRandomFrom, generateRandomNumber, nextLevelStatValue } from '../helpers';

describe('chooseRandomFrom', () => {
  test('it returns a random dragon', () => {
    expect(chooseRandomFrom(['blue', 'red', 'yellow'], 3)).toBeDefined();
  })
});

describe('generateRandomNumber', () => {
  test('it returns a string generated from a random number and date object', () => {
    expect(generateRandomNumber()).toBeDefined();
  })
});

describe('nextLevelStatValue', () => {
  test('it returns a stat multipled by a given number', () => {
    expect(nextLevelStatValue(20, .10)).toEqual(22);
  });
});



// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
