module.exports.getRandomNumberBetweenTwoNumbers = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

module.exports.makeId = (length = 6) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}