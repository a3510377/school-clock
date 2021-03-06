/** random number | 隨機數 */
export const random = (max: number, min = 0) => ~~(Math.random() * max) + min;

/** round decimal | 四捨五入 */
export const roundDecimal = (val: number, precision = 0) => {
  return (
    Math.round(Math.round(val * 10 ** (precision + 1)) / 10) / 10 ** precision
  );
};

export const UUID = () => {
  let d = Date.now() + performance.now();

  return 'xxxxxx-yy-yyx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 32) % 32 | 0;
    d = Math.floor(d / 32);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(32);
  });
};
