// custom function used to check whether a given string consists of valid input
// .trim takes the spaces off the input
const validText = str => {
    return typeof str === 'string' && str.trim().length > 0;
  }
  
  module.exports = validText;