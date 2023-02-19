//Функция для проверки длины строки
function verifyLength (str, length) {
  if (str.length <= length) {
    return true;
  }
  return false;
}
verifyLength('проверяемая строка', 20); //true

//Функция для проверки, является ли строка палиндромом.
function isPalindrome (str) {
  str = str.toLowerCase().replaceAll(' ','');
  for (let i = 1; i <= str.length / 2; i++) {
    if (str[i - 1] === str[str.length - i]){
      return true;
    }
    return false;
  }
}
isPalindrome('топот'); //true

/*Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN
*/
function returnNumber (str) {
  let answer = '';
  for (let i = 0; i < str.length; i++) {
    if (Number(str[i]) || str[i] === '0') {
      answer += str[i];
    }
  }
  if (answer === '') {
    return NaN;
  }
  return Number(answer);
}
returnNumber('ECMAScript 2022'); // 2022


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
  } else {
    let answer = '';
    let subtotal = '';
    while (answer.length !== stringLength - stringBasic.length) {
      subtotal = stringAdditional + answer;
      if (subtotal.length <= stringLength - stringBasic.length) {
        answer = subtotal;
      } else {
        answer = stringAdditional.slice(0, stringLength - stringBasic.length - answer.length) + answer;
        break;
      }
    }
    return answer + stringBasic;
  }
}
addString('1', 4, '0'); //'0001'
