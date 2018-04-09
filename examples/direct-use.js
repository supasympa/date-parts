const DateParts = require('../index');

const dp = DateParts.dateParts('2018-04-09T07:39:12.000Z');

console.log(`the date parts right now are: ${JSON.stringify(dp, 0, 4)}`);
