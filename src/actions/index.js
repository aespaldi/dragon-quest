import axios from 'axios';

export const GET_RANDOM_DRAGON = 'GET_RANDOM_DRAGON';
export const ADD_DRAGON = 'ADD_DRAGON';
export const ENTER_FIGHT = 'ENTER_FIGHT';
export const FIGHTING_DRAGON = 'FIGHTING_DRAGON';
export const SPAWN_HUMAN = 'SPAWN_HUMAN';
export const SAVE_NEW_HUMAN = 'SAVE_NEW_HUMAN';
export const UPDATE_HUMAN_HP = 'UPDATE_HUMAN_HP';
export const UPDATE_DRAGON_HP = 'UPDATE_DRAGON_HP';
export const SAVE_NEW_DRAGON = 'SAVE_NEW_DRAGON';
export const MERGING_DRAGON = 'MERGING_DRAGON';
export const CLEAR_MERGING_DRAGONS = 'CLEAR_MERGING_DRAGONS';
export const GET_DRAGON_LIST = 'GET_DRAGON_LIST';
export const REMOVE_DRAGON = 'REMOVE_DRAGON';
export const DRAGON_BY_ID = 'DRAGON_BY_ID';

// const ROOT_URL = `https://dragon-game-api.herokuapp.com`;
const ROOT_URL = 'http://localhost:3001';

export function getRandomDragon(level) {
  const url = `${ROOT_URL}/dragons/random/${level}`;
  const request = axios.get(url);

  return {
    type: GET_RANDOM_DRAGON,
    payload: request,
  }
}

export function getDragonById(id) {
  const url = `${ROOT_URL}/dragons/${id}`;
  const request = axios.get(url);

  return {
    type: DRAGON_BY_ID,
    payload: request,
  }
}

export function addToUserDragons(dragon) {
  return {
    type: ADD_DRAGON,
    payload: dragon,
  }
}

export function removeFromUserDragons(dragon) {
  return {
    type: REMOVE_DRAGON,
    payload: dragon,
  }
}

export function enterFightMode(dragon) {
  return {
      type: FIGHTING_DRAGON,
      payload: dragon,
    }
}

export function callHuman(id) {
  const url = `${ROOT_URL}/humans/${id}`;
  const request = axios.get(url);
  return {
    type: SPAWN_HUMAN,
    payload: request,
  }
}

export function saveHuman(human) {
  return {
    type: SAVE_NEW_HUMAN,
    payload: human,
  }
}

export function updateHumanHP(human) {
  return {
    type: UPDATE_HUMAN_HP,
    payload: human,
  }
}

export function updateDragonHP(dragon) {
  return {
    type: UPDATE_DRAGON_HP,
    payload: dragon,
  }
}

export function saveDragon(dragon) {
  return {
    type: SAVE_NEW_DRAGON,
    payload: dragon,
  }
}

export function mergingDragon(dragon) {
  return {
    type: MERGING_DRAGON,
    payload: dragon,
  }
}

export function clearMergingDragons(nothing) {
  return {
    type: CLEAR_MERGING_DRAGONS,
    payload: nothing,
  }
}

export function getAllDragonsForLevel(level) {
  const url = `${ROOT_URL}/dragons/level/${level}`;
  const request = axios.get(url);
  return {
    type: GET_DRAGON_LIST,
    payload: request,
  }
}
