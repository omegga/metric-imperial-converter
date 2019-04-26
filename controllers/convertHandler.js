const reg = /^((?:(?:\d+)(?:\.\d+)?)|(?:)|(?:(?:(?:\d+)(?:\.\d+)?)\/(?:(?:\d+)(?:\.\d+)?)))[a-zA-z]+$/;
const reg2 = /([a-zA-z]+)$/;
const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;
const unitsMap = {
  'gal': ['l', 'gallons', x => x * galToL],
  'l': ['gal', 'liters', x => x / galToL],
  'lbs': ['kg', 'pounds', x => x * lbsToKg],
  'kg': ['lbs', 'kilograms', x => x / lbsToKg],
  'mi': ['km', 'miles', x => x * miToKm],
  'km': ['mi', 'kilometres', x => x / miToKm]
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
    return Number(unitsMap[initUnit.toLowerCase()][2](+initNum).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
