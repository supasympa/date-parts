const _ = require('../index');

_.extendDate();

let dp = new Date().dateParts();

console.log(`the date parts right now are:
 ${JSON.stringify(dp, 0, 4)}`);

console.log(`the date today is ${dp.dd}-${dp.MM}-${dp.yyyy} (GB)`);
console.log(`the date today is ${dp.MM}-${dp.dd}-${dp.yyyy} (US)`);

dp = new Date(2012, 11, 12).dateParts();
console.log(`the date was ${dp.MM}-${dp.dd}-${dp.yyyy}`);
