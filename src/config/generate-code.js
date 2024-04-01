const crypto = require("crypto");

function generateUniqueString(length = 6) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uniqueString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(characters.length);
    uniqueString += characters.charAt(randomIndex);
  }

  return uniqueString;
}

module.exports = {
  generateUniqueString,
};
