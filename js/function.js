//Функция для проверки длины строки
const verifyLength = (str, length) => str.length <= length;
verifyLength('проверяемая строка', 20);

//Функция для проверки, является ли строка палиндромом.
function isPalindrome (str) {
  str = str.toLowerCase().replaceAll(' ','');
  let reverseString = '';
  if (str.length > 1) {
    for (let i = str.length - 1; i >= 0; i--) {
      reverseString += str[i];
    }
    return str === reverseString;
  }
  return false;
}
isPalindrome('топот'); //true
isPalindrome('f'); //false

/*Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN
*/
function extractNumber (str) {
  let answer = '';
  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str[i], 10))) {
      answer += str[i];
    }
  }
  return +answer;
}
extractNumber('ECMAScript 2022'); // 2022


/*Функция, которая принимает три параметра:
исходную строку,
минимальную длину и строку с добавочными символами
— и возвращает исходную строку, дополненную указанными символами до заданной длины.
Символы добавляются в начало строки.
Если исходная строка превышает заданную длину, она не должна обрезаться.
Если «добивка» слишком длинная, она обрезается с конца.
*/
function addString (stringBasic, stringLength, stringAdditional) {
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
}
addString('1', 4, '0'); //'0001'
