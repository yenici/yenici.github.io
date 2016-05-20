let pow = require('../js/pow.js');
let  precision = 5;

describe('Testsuite for pow(a, b) function /testing oracles: Math.pow(a, b)/', function() {

  it(
    'Natural arguments (3 ^ 5 = 243)',
    () => expect(pow(3, 5)).toEqual(Math.pow(3, 5))
  );
  it(
    'Zero exponent testing (10 ^ 0 = 1) ',
    () => expect(pow(10, 0)).toEqual(Math.pow(10, 0))
  );
  it(
    'Zero base testing (0 ^ 3 = 0) ',
    () => expect(pow(0, 3)).toEqual(Math.pow(0, 3))
  );
  it(
    'Zero base and exponent testing (0 ^ 0 = 0) ',
    () => expect(pow(0, 0)).toEqual(Math.pow(0, 0))
  );
  it(
    'Zero base and negative exponent testing (0 ^ -1 = 0) ',
    () => expect(pow(0, -1)).toEqual(Math.pow(0, -1))
  );
  it(
    'Simple negative exponent testing (2 ^ -1 = 0.5) ',
    () => expect(pow(2, -1)).toBeCloseTo(Math.pow(2, -1), precision)
  );
  it(
    'Negative exponent testing (9 ^ -3 = 0.00137) ',
    () => expect(pow(9, -3)).toBeCloseTo(Math.pow(9, -3), precision)
  );
  it(
    'Simple negative exponent testing (2 ^ -1 = 0.5) ',
    () => expect(pow(2, -1)).toBeCloseTo(Math.pow(2, -1), precision)
  );
  it(
    'Negative base testing (-3 ^ 3 = -27) ',
    () => expect(pow(-3, 3)).toEqual(Math.pow(-3, 3))
  );
  it(
    'Real exponent testing (4 ^ 0.5 = 2) ',
    () => expect(pow(4, 0.5)).toEqual(Math.pow(4, 0.5))
  );


});
