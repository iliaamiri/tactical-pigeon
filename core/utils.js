module.exports.getRandomNumberBetweenTwoNumbers = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

module.exports.makeId = (length = 6) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
};

module.exports.makeGuestId = () => {
  let length = 15; // Length of the guestId's number fraction (after underline).
  let result = 'guest_';
  let characters = '0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
};
