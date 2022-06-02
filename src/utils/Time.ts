export const getTime = () => {
  const now = new Date();

  const second = now.getSeconds() * 6;
  const minute = now.getMinutes() * 6 + second / 60;
  const hour = (now.getHours() % 12) * 30 + minute / 60;

  return {
    second: now.getSeconds(),
    minute: now.getMinutes(),
    hour: now.getHours(),
    deg: { second, minute, hour },
  };
};
