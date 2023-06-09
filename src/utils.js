import dayjs from 'dayjs';

const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 1440;
const TIME_FORMAT = 'hh:mm';
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';

const humanizeWayPointDate = (date) => dayjs(date).format('DD MMM');

const getTime = (date) => dayjs(date).format(TIME_FORMAT);

const getDate = (date) => dayjs(date).format(DATE_FORMAT);

const getDateTime = (date) => dayjs(date).format(DATE_TIME_FORMAT);

const getDuration = (startTime, endTime) => {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const difference = end.diff(start, 'minute');

  const daysDifference = Math.floor(difference / MINUTES_PER_DAY);
  const hoursDifference = Math.floor((difference - daysDifference * MINUTES_PER_DAY) / MINUTES_PER_HOUR);
  const minutesDifference = difference - (daysDifference * MINUTES_PER_DAY + hoursDifference * MINUTES_PER_HOUR);

  const daysOutput = (daysDifference) ? `${daysDifference}D` : '';
  const hoursOutput = (hoursDifference) ? `${hoursDifference}H` : '';
  const minutesOutput = (minutesDifference) ? `${minutesDifference}M` : '';

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};

const getRandomInt = (a = 0, b = 1) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  return Math.floor(min + Math.random() * (max - min + 1));
};

const getRandomElement = (elements) => {
  const min = 0;
  const max = elements.length - 1;
  return elements[getRandomInt(min, max)];
};

export { getRandomInt, getRandomElement, humanizeWayPointDate, getDuration, getDate, getDateTime, getTime };
