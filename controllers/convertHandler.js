const reg = /^((?:(?:\d+)(?:\.\d+)?)|(?:)|(?:(?:(?:\d+)(?:\.\d+)?)\/(?:(?:\d+)(?:\.\d+)?)))[a-zA-z]+$/;
const reg2 = /([a-zA-z]+)$/;
const unitsMap = {
  'gal': ['l', 'gallons', x => x * 3.78541],
  'l': ['gal', 'liters', x => x / 3.78541],
  'lbs': ['kg', 'pounds', x => x * 0.453592],
  'kg': ['lbs', 'kilograms', x => x / 0.453592],
  'mi': ['km', 'miles', x => x * 1.60934],
  'km': ['mi', 'kilometres', x => x / 1.60934]
};
const unitsList = Object.keys(unitsMap);

function ConvertHandler() {
  
  this.getNum = function(input) {
    if (!reg.test(input)) {
      return null;
    }
    let [ str, num ] = input.match(reg);
    if (num.includes('/')) {
      num = num.split('/');
      num = num[0] / num[1];
    }
    return num === '' ? 1 : Number(num);
  };
  
  this.getUnit = function(input) {
    let [ str, unit ] = input.match(reg2);
    if (!unitsList.includes(unit.toLowerCase())) {
      return null;
    }
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    return unitsMap[initUnit.toLowerCase()][0];
  };

  this.spellOutUnit = function(unit) {
    return unitsMap[unit][1];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    return Number(unitsMap[initUnit.toLowerCase()][2](+initNum).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
