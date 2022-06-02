import moment from 'moment';

export const getCurrentByTimeZone = (time: number, offset: number): number => {
  if (offset === undefined) offset === 0;
  return moment.utc(time).utcOffset(offset).unix();
}