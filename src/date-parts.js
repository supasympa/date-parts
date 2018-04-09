/**
 * Date functions mainly supporting the date parts function
 */

/**
 * checks if this years was a leap year
 * @param year {number}
 */
const isLeapYear = year => {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};
/**
 * checks if the day of the month is valid for the month / year combination
 * @param yyyy {number}
 * @param MM {number}
 * @param dd {number}
 */
const checkDayIsValidForMonth = (yyyy, MM, dd) => {
  const shortMonths = [4, 6, 9, 11];

  if (dd < 1 || MM < 1) {
    throw new RangeError('Day less than 1');
  }

  if (dd <= 28) {
    return;
  }

  if (dd > 31) {
    throw new RangeError('Day greater than 31');
  }

  if (shortMonths.indexOf(MM) > -1 && dd > 30) {
    throw new RangeError('Day greater than 30 for short month');
  }

  if (
    (MM === 2 && (!!isLeapYear(yyyy) && dd > 29)) ||
    (MM === 2 && (!isLeapYear(yyyy) && dd > 28))
  ) {
    throw new RangeError(`There are not ${dd} days in 02 ${yyyy}.`);
  }
};
/**
 * attempts to validate an ISO date string
 * @param isoDate  {string}
 */
const validateIsoDate = isoDate => {
  /**
   * (kind of) validate the date before continuing.
   */
  if (isoDate.length !== 24) {
    throw RangeError(
      'Date is not 23 characters long expecting format yyyy-MM-ddThh:mm:ss.mmsZ'
    );
  }
  if (
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(
      isoDate
    ) &&
    new Date(isoDate).toString() === 'Invalid Date'
  ) {
    throw new Error('Invalid ISO Date');
  }

  const dd = isoDate.substring(8, 10);
  const MM = isoDate.substring(5, 7);
  const yyyy = isoDate.substring(0, 4);

  checkDayIsValidForMonth(Number(yyyy), Number(MM), Number(dd));

  return { yyyy, MM, dd };
};

/**
 * converts an iso date string into an object with parts of the date represented
 * @param isoDate
 * @returns {{
 *            ms: string,
 *            ss: string,
 *            mm: string,
 *            hh: string,
 *            dd: string,
 *            MM: string,
 *            yyyy: string,
 *            ts: number,
 *            meridiem: string,
 *            iso: string}}
 */
const dateParts = (isoDate = new Date().toISOString()) => {
  const { yyyy, MM, dd } = validateIsoDate(isoDate);

  return {
    ms: isoDate.substring(20, 23),
    ss: isoDate.substring(17, 19),
    mm: isoDate.substring(14, 16),
    hh: isoDate.substring(11, 13),
    dd,
    MM,
    yyyy,
    ts: new Date(isoDate).getTime(),
    meridiem: Number(isoDate.substring(11, 13)) < 12 ? 'am' : 'pm',
    iso: isoDate
  };
};

const extendDate = () => {
  Date.prototype.dateParts = function() {
    return dateParts(this.toISOString());
  };
};

export {
  dateParts,
  isLeapYear,
  checkDayIsValidForMonth,
  validateIsoDate,
  extendDate
};
