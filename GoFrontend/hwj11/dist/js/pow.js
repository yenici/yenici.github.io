'use strict';

/**
*
* Returns the base to the exponent power
*
* @param {Numeric} base
* @param {Numeric} exponent
*
*/
function pow(base, exponent) {
  'use strict';

  var result = 1;
  for (var i = 0; i < Math.abs(exponent); i++) {
    result *= base;
  }
  return exponent < 0 ? 1 / result : result;
}

module.exports = pow;