import axios from 'axios';

export const ADD_DRAGON = 'ADD_DRAGON';
export const CLEAR_FIGHTING_DRAGON = 'CLEAR_FIGHTING_DRAGON';
export const CLEAR_MERGING_DRAGONS = 'CLEAR_MERGING_DRAGONS';
export const CLEAR_RANDOM_DRAGON = 'CLEAR_RANDOM_DRAGON';
export const CLEAR_NEW_DRAGON = 'CLEAR_NEW_DRAGON';
export const ENTER_FIGHT = 'ENTER_FIGHT';
export const FIGHTING_DRAGON = 'FIGHTING_DRAGON';
export const GET_DRAGON_LIST = 'GET_DRAGON_LIST';
export const GET_RANDOM_DRAGON = 'GET_RANDOM_DRAGON';
export const MERGING_DRAGON = 'MERGING_DRAGON';
export const REMOVE_DRAGON = 'REMOVE_DRAGON';
export const SAVE_NEW_DRAGON = 'SAVE_NEW_DRAGON';
export const SAVE_NEW_HUMAN = 'SAVE_NEW_HUMAN';
export const SPAWN_HUMAN = 'SPAWN_HUMAN';
export const UPDATE_HUMAN_HP = 'UPDATE_HUMAN_HP';
export const UPDATE_DRAGON_HP = 'UPDATE_DRAGON_HP';

// const ROOT_URL = `https://dragon-game-api.herokuapp.com`;
const ROOT_URL = 'http://localhost:3001';

// action creators that pull from the api:

/**
* Call a human from the database.
*
* @param {number} id
* @returns {object} - representing the type of request and a payload representing a promise which resolves to the row in the humans table matching the given id.
*
*/

export function callHuman(id) {
  const url = `${ROOT_URL}/humans/${id}`;
  const request = axios.get(url);
  return {
    type: SPAWN_HUMAN,
    payload: request,
  }
}

/**
* @function getAllDragons - get all dragons from the dragons table in the database.
*
* @returns {object} - with a type of action and a payload of a promise that resolves to all rows in the dragons table.
*
*/

export function getAllDragons() {
  const url = `${ROOT_URL}/dragons`;
  const request = axios.get(url);
  return {
    type: GET_DRAGON_LIST,
    payload: request,
  }
}

/**
* get a random dragon by level.
*
* @param {string} level
* @returns {object} - with a type of action and a payload containing a promise that resolves to a random row in the database matching the passed in level.
*
*/

export function getRandomDragon(level) {
  const url = `${ROOT_URL}/dragons/random/${level}`;
  const request = axios.get(url);

  return {
    type: GET_RANDOM_DRAGON,
    payload: request,
  }
}

// functions that change state internally.

/**
* Adds a dragon to the main user collection (an array).
*
* @param {object} dragon - an object containing all characteristics of a dragon.
* @returns {object} - with a type of action and a payload with the dragon object that was passed in.
*/

export function addToUserDragons(dragon) {
  return {
    type: ADD_DRAGON,
    payload: dragon,
  }
}


/**
* replaces the fightingDragon in the store with an empty object.
*
* @returns {object} - with the type of action
*
*/

export function clearFightingDragon() {
  return {
    type: CLEAR_FIGHTING_DRAGON,
  }
}

/**
* replaces the mergingDragons in the store with an empty object.
*
* @returns {object} - with the type of action
*
*/

export function clearMergingDragons() {
  return {
    type: CLEAR_MERGING_DRAGONS,
  }
}

/**
* replaces the shinyNewDragon in the store with an empty object.
*
* @returns {object} - with the type of action
*
*/

export function clearNewDragon() {
  return {
    type: CLEAR_NEW_DRAGON,
  }
}

/**
* replaces the randomDragon in the store with an empty object.
*
* @returns {object} - with the type of action
*
*/

export function clearRandomDragon() {
  return {
    type: CLEAR_RANDOM_DRAGON,
  }
}

/**
* passes a clicked dragon into a fight by assigning it to the fightingDragon key in the store.
*
* @param {object} dragon - the dragon entering the fight.
* @returns {object} - with the type of action
*
*/

export function enterFightMode(dragon) {
  return {
      type: FIGHTING_DRAGON,
      payload: dragon,
    }
}

/**
* passes a merged dragon into a merge by assigning it to the mergingDragons array key in the store.
*
* @param {object} dragon - representing the dragon being passed in.
* @returns {object} - with the type of action and the payload of the dragon object passed in.
*
*/

export function mergingDragon(dragon) {
  return {
    type: MERGING_DRAGON,
    payload: dragon,
  }
}

/**
* deletes the passed in dragon from the user collection in the store.
*
* @param {object} dragon - representing the dragon being passed in.
* @returns {object} - with the type of action and the payload of the dragon object passed in.
*
*/

export function removeFromUserDragons(dragon) {
  return {
    type: REMOVE_DRAGON,
    payload: dragon,
  }
}

/**
* saves a newly leveled up dragon to the shinyNewDragon key in the store for displaying it to the user (before it gets added to the main collection.)
*
* @param {object} dragon - representing the dragon being saved.
* @returns {object} - with the type of action and the dragon object being passed in.
*
*/

export function saveDragon(dragon) {
  return {
    type: SAVE_NEW_DRAGON,
    payload: dragon,
  }
}

/**
* saves a newly leveled up human to the human key in the store.
*
* @param {object} human - representing the human being saved.
* @returns {object} - with the type of action and the human object being passed in.
*
*/

export function saveHuman(human) {
  return {
    type: SAVE_NEW_HUMAN,
    payload: human,
  }
}

/**
* saves the stats of a human after being damaged in battle to the human key in the store.
*
* @param {object} human - representing the human being saved.
* @returns {object} - with the type of action and the human object being passed in.
*
*/

export function updateHuman(human) {
  return {
    type: UPDATE_HUMAN_HP,
    payload: human,
  }
}

/**
* saves the stats of a dragon after being damaged in battle to the fightingDragon key in the store.
*
* @param {object} dragon - representing the dragon being saved.
* @returns {object} - with the type of action and the dragon object being passed in.
*
*/

export function updateDragon(dragon) {
  return {
    type: UPDATE_DRAGON_HP,
    payload: dragon,
  }
}
