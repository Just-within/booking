import moment from 'moment-timezone';

const timezones = moment.tz.names();

export const timezoneData = timezones.map((timezone) => {
  const tz = moment.tz(timezone);
  const utcOffset = tz.utcOffset();
  return {
    utcOffset,
    timezone,
    name: `${timezone} ${`UTC${utcOffset >= 0 ? '+' : ''}${utcOffset / 60}`}`
  }
})