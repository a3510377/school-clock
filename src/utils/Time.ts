import { timeFormatType } from 'types/data';

export const getTime = (time?: Date) => {
  const now = time || new Date();
  const day = now.getDay();

  return {
    seconds: now.getSeconds(),
    minutes: now.getMinutes(),
    hours: now.getHours(),
    worker: day === 0 ? 7 : day + 1,
  };
};

export const getTimeAngle = () => {
  const { seconds, minutes, hours } = getTime();

  const second = seconds * 6;
  const minute = minutes * 6 + second / 60;
  const hour = (hours % 12) * 30 + minute / 60;

  return { second, minute, hour };
};

export const formatTime = (
  option?: Partial<Record<'minute' | 'hour', number>> | Date
): timeFormatType => {
  const now = getTime(option instanceof Date ? option : void 0);
  const _option = { minute: now.minutes, hour: now.hours, ...option };

  return `${_option.hour}:${_option.minute}`;
};
