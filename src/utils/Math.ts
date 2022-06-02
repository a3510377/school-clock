/** random number | 隨機數 */
export const random = (max: number, min = 0) => ~~(Math.random() * max) + min;

/** round decimal | 四捨五入 */
export const roundDecimal = (val: number, precision = 0) => {
  return (
    Math.round(Math.round(val * 10 ** (precision + 1)) / 10) / 10 ** precision
  );
};
