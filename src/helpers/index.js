/**
* @function generateRandomNumber - creates unique key to use as IDs and keys throughout the app.
* @returns {number}
*/

function generateRandomNumber() {
  const randomNum = Math.floor(Math.random() * 10000);
  return `${randomNum}_${new Date().getTime()}`;
}

module.exports = generateRandomNumber;
