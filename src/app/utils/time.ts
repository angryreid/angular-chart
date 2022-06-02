import moment, { Moment } from 'moment';

export const getCurrentByTimeZone = (
  timeStamp: number,
  offset: number
): Moment => {
  return moment.utc(timeStamp).utcOffset(offset || 0);
};