/**
* @function generateRandomNumber - creates unique key to use as IDs and keys throughout the app.
* @returns {number}
*/

function generateRandomNumber() {
  const randomNum = Math.floor(Math.random() * 10000);
  return `${randomNum}_${new Date().getTime()}`;
}

function nextLevelStatValue(currentStatValue, multiplier) {
  return Math.round(currentStatValue + (currentStatValue * multiplier))
}

module.exports = { generateRandomNumber, nextLevelStatValue };
