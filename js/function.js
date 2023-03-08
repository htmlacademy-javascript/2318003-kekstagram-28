//Функция для проверки длины строки
const verifyLength = (str, length) => str.length <= length;
verifyLength('проверяемая строка', 20);

//Функция для проверки, является ли строка палиндромом.
const isPalindrome = (str) => {
  let usedStr = str;
  usedStr = str.toLowerCase().replaceAll(' ','');
  let reverseString = '';
  if (usedStr.length > 1) {
    for (let i = usedStr.length - 1; i >= 0; i--) {
      reverseString += usedStr[i];
    }
    return usedStr === reverseString;
  }
  return false;
};
isPalindrome('топот'); //true
isPalindrome('f'); //false

/*Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN
*/
const extractNumber = (str) => {
  let usedStr = str;
  let answer = '';
  if (typeof str === 'number') {
    usedStr = str.toString();
  }
  for (let i = 0; i < usedStr.length; i++) {
    if (!Number.isNaN(parseInt(usedStr[i], 10))) {
      answer += usedStr[i];
    }
  }
  return +answer || NaN;
};
extractNumber('ECMAScript 2022'); // 2022


/*Функция, которая принимает три параметра:
исходную строку,
минимальную длину и строку с добавочными символами
— и возвращает исходную строку, дополненную указанными символами до заданной длины.
Символы добавляются в начало строки.
Если исходная строка превышает заданную длину, она не должна обрезаться.
Если «добивка» слишком длинная, она обрезается с конца.
*/
const addString = (stringBasic, stringLength, stringAdditional) => {
  if (stringBasic.length >= stringLength) {
    return stringBasic;
  }
  let answer = '';
  let subtotal = '';
  const vacancy = stringLength - stringBasic.length;
  while (answer.length !== vacancy) {
    subtotal = stringAdditional + answer;
    if (subtotal.length <= vacancy) {
      answer = subtotal;
    }
    answer = stringAdditional.slice(0, vacancy - answer.length) + answer;
    break;
  }
  return answer + stringBasic;
};
addString('1', 4, '0'); //'0001'
