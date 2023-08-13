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

//делу время
let getTimeArray = function (time) {
  let createArray = time.split(':');
  let getMinutes = (parseInt(createArray[0]) * 60) + parseInt(createArray[1]);
  return getMinutes;
};

let comparisonTime = function (startTime, endTime, meetTime, long) {
  let startMin = getTimeArray(startTime);
  let endMin = getTimeArray(endTime);
  let meetMin = getTimeArray(meetTime);

  if (startMin <= meetMin && endMin >= (meetMin + long)) {
    return true;
  } else {
    return false;
  }
};

console.log(comparisonTime('08:00', '17:30', '14:00', 90));
console.log(comparisonTime('8:0', '10:0', '8:0', 120));
console.log(comparisonTime('08:00', '14:30', '14:00', 90));
console.log(comparisonTime('14:00', '17:30', '08:0', 90));
console.log(comparisonTime('8:00', '17:30', '08:00', 900));
