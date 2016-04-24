/*
  Написать функцию pow, аналогичную Math.pow, которая должна возводить указанное число в указанную степень.
  Указать число и степень пользователь должен через команду prompt.
  Результат выполнения функции вывести в консоль.
  Работать с целыми числами, большими, меньшими, и равными нулю.
  Бесконечности можно не обрабатывать
*/

var base, exponent;

do {
  base = parseInt(
    prompt("Введите основание (целое число)"));
} while (isNaN(base))

do {
  exponent = parseInt(prompt("Ведите экспоненту (целое число)"));
} while (isNaN(exponent))

console.log('pow:  ' + base + ' ^ ' + exponent + ' = ' + pow(base, exponent));
console.log('powr: ' + base + ' ^ ' + exponent + ' = ' + powr(base, exponent));

/**
*
* Returns the base to the exponent power
*
* @param {Numeric} base
* @param {Numeric} exponent
*
*/
function pow(base, exponent) {
  var result = 1;
  for (var i = 0; i < Math.abs(exponent); i++) {
    result *= base;
  }
  return (exponent < 0) ? 1 / result : result;
}

/**
*
* Returns the base to the exponent power.
* Implementation with recursion.
*
* @param {Numeric} base
* @param {Numeric} exponent
*
*/
function powr(base, exponent) {
  function p(b, e) {
    return (e == 0) ? 1: base * p(b, e - 1);
  }
  return (exponent < 0) ? 1 / p(base, -exponent) : p(base, exponent);
}
