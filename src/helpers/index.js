
/**
* @function chooseRandomFrom - takes in an array of dragons and returns a random one.
* @param {array} arr - the array of dragons passed in.
* @param {number} num - the array's length.
* @returns {object} - an object representing the chosen dragon.
*/

function chooseRandomFrom(arr, num) {
  const index = Math.floor(Math.random() * num);
  const chosenDragon = arr[index];
  return chosenDragon;
};

/**
* @function generateRandomNumber - creates unique key to use as IDs and keys throughout the app.
* @returns {number}
*/

function generateRandomNumber() {
  const randomNum = Math.floor(Math.random() * 10000);
  return `${randomNum}_${new Date().getTime()}`;
};


function nextLevelStatValue(currentStatValue, multiplier) {
  return Math.round(currentStatValue + (currentStatValue * multiplier))
}



module.exports = { chooseRandomFrom, generateRandomNumber, nextLevelStatValue };
