import 'mocha';
import chai from 'chai';
import { dateParts, extendDate } from '../src';

const { expect } = chai;

describe('A date parts function', () => {
  context(
    'Created with a valid ISO date string of 2018-04-06T17:28:31.333Z',
    () => {
      const isoDate = '2018-04-06T17:28:31.333Z';
      const dp = dateParts(isoDate);

      it('should return a date parts object', () => {
        expect(dp).to.be.a('object');
        expect(Object.keys(dp)).to.deep.equal(
          'ms,ss,mm,hh,dd,MM,yyyy,ts,meridiem,iso'.split(',')
        );
      });

      it('should return an object whose ms property is "333"', () => {
        expect(dp.ms).to.equal('333');
      });

      it('should return an object whose ss property is "31"', () => {
        expect(dp.ss).to.equal('31');
      });

      it('should return an object whose mm property is "28"', () => {
        expect(dp.mm).to.equal('28');
      });

      it('should return an object whose hh property is "17"', () => {
        expect(dp.hh).to.equal('17');
      });

      it('should return an object whose dd property is "06"', () => {
        expect(dp.dd).to.equal('06');
      });

      it('should return an object whose MM property is "04"', () => {
        expect(dp.MM).to.equal('04');
      });

      it('should return an object whose yyyy property is "2018"', () => {
        expect(dp.yyyy).to.equal('2018');
      });

      it('should return an object whose timestamp property is 1523035711333', () => {
        expect(dp.ts).to.equal(1523035711333);
      });

      it('should return an object whose meridiem property is "pm', () => {
        expect(dp.meridiem).to.equal('pm');
      });
    }
  );

  describe('run on multiple dates', () => {
    const tests = [
      {
        isoDate: '2000-01-30T00:00:00.333Z',
        expected: {
          ms: '333',
          ss: '00',
          mm: '00',
          hh: '00',
          dd: '30',
          MM: '01',
          yyyy: '2000',
          ts: 949190400333,
          meridiem: 'am',
          iso: '2000-01-30T00:00:00.333Z'
        }
      },

      {
        isoDate: '1999-12-31T12:00:00.001Z',
        expected: {
          ms: '001',
          ss: '00',
          mm: '00',
          hh: '12',
          dd: '31',
          MM: '12',
          yyyy: '1999',
          ts: 946641600001,
          meridiem: 'pm',
          iso: '1999-12-31T12:00:00.001Z'
        }
      },

      {
        isoDate: '2012-02-29T12:00:00.001Z',
        expected: {
          ms: '001',
          ss: '00',
          mm: '00',
          hh: '12',
          dd: '29',
          MM: '02',
          yyyy: '2012',
          ts: 1330516800001,
          meridiem: 'pm',
          iso: '2012-02-29T12:00:00.001Z'
        }
      }
    ];

    tests.forEach(underTest => {
      it(`should work for a date of ${underTest.isoDate}`, () => {
        expect(dateParts(underTest.isoDate)).to.deep.equal(underTest.expected);
      });
    });
  });

  context('Created without an ISO date string', () => {
    const dp = dateParts();

    it('should return a date parts object', () => {
      expect(dp).to.be.a('object');
      expect(Object.keys(dp)).to.deep.equal(
        'ms,ss,mm,hh,dd,MM,yyyy,ts,meridiem,iso'.split(',')
      );
    });
  });

  context('Created with an invalid ISO date string (of 24 characters)', () => {
    const invalidDates = [
      'FOO2018-04-06T17:28:31.333ZBAR',
      '2018-13-06T17:28:31.333Z',
      '2018-02-30T17:28:31.333Z',
      '2018-01-32T17:28:31.333Z',
      '2018-13-01T17:28:31.333Z',
      '0001-13-00T17:28:31.333Z',
      '0001-0-10T17:28:31.333Z',
      '1-00-10T17:28:31.333Z'
    ];

    invalidDates.forEach(invalidDate => {
      it(`should throw for a date of ${invalidDate}`, () => {
        expect(() => dateParts(invalidDate)).to.throw();
      });
    });
  });

  context('extendDate', () => {
    it('should extend the date object', () => {
      extendDate();
      const dp = new Date().dateParts();
      expect(dp).to.be.a('object');
      expect(Object.keys(dp)).to.deep.equal(
        'ms,ss,mm,hh,dd,MM,yyyy,ts,meridiem,iso'.split(',')
      );
    });
  });
});
