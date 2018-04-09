# Date-parts

A simple function to extract an object with properties representing each part of a date.

```
console.log(JSON.stringify(dateParts(`2018-04-06T20:42:15.797Z`), 0, 4))

/*
* will output
 {
    "ms": "797",
    "ss": "15",
    "mm": "42",
    "hh": "20",
    "dd": "06",
    "MM": "04",
    "yyyy": "2018",
    "ts": 1523047335797,
    "meridiem": "pm",
    "iso": "2018-04-06T20:42:15.797Z"
}
*/
```
## Example (direct use):
```
const DateParts = require('date-parts');

const dp = DateParts.dateParts('2018-04-09T07:39:12.000Z');

console.log(`the date parts right now are: ${JSON.stringify(dp, 0, 4)}`);

/*
should output ...

the date parts right now are: {
    "ms": "000",
    "ss": "12",
    "mm": "39",
    "hh": "07",
    "dd": "09",
    "MM": "04",
    "yyyy": "2018",
    "ts": 1523259552000,
    "meridiem": "am",
    "iso": "2018-04-09T07:39:12.000Z"
}

*/

```

## Example (extending date object):
```
const _ = require('date-parts');

_.extendDate();

let dp = new Date().dateParts();

console.log(`the date parts right now are:
 ${JSON.stringify(dp, 0, 4)}`);

console.log(`the date today is ${dp.dd}-${dp.MM}-${dp.yyyy} (GB)`);
console.log(`the date today is ${dp.MM}-${dp.dd}-${dp.yyyy} (US)`);

dp = new Date(2012, 11, 12).dateParts();
console.log(`the date was ${dp.MM}-${dp.dd}-${dp.yyyy}`);
```

### Prerequisites
Your environment should support [.toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)


### Installation

```
    npm install -S date-parts
```

## Running the tests
    npm test

## Built With

* [Babel](http://babeljs.io/)
* [Mocha](https://mochajs.org)
* [Webpack](https://webpack.js.org/)
* [Prettier](https://prettier.io)
* [Eslint](https://eslint.org)
* [Webstorm](https://www.jetbrains.com/webstorm/)

## Authors

* **Lewis Barclay [Supa Sympa Ltd](http://supasympa.com)**

## License

This project is licensed under the Apache-2 License - see the [LICENSE.md](LICENSE.md) file for details

