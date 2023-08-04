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
  let normalString = string.replaceAll(' ', '').toUpperCase();
  let reversPoly = '';

  for (let simbolCounter = normalString.length - 1; simbolCounter >= 0; simbolCounter = simbolCounter - 1) {
    reversPoly += normalString.at(simbolCounter);
  }

  return normalString === reversPoly;
};

let poly = polyString('Лёша на полке клопа нашёл ');
let poly2 = polyString('ckjdf ');
console.log (poly);
console.log (poly2);
