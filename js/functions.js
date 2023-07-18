//длина строки
let stringLength = function (string, maxSimbols) {
  if (string.length <= maxSimbols) {
    return true;
  } else {
    return false;
  }
};

let result = stringLength('ggg hhtht ertw', 20);
console.log (result);
