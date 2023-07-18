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

//палиндром
let polyString = function (string) {
 let normalString = string.replaceAll(" ", "").toUpperCase();
 return normalString;
};

let poly = polyString('Лёша на полке клопа нашёл ');
console.log (poly);
