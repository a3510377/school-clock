export type Bit2 = '0' | '1';

export interface BaseConfigType {
  /** repeat | 重複 */
  repeat: boolean;
  /** week | 星期 */
  weeks: boolean[];
}
export interface ClockConfigType extends BaseConfigType {}
export interface TabConfigType extends BaseConfigType {}

export interface TabType {
  id: string;
  name: string;
  config?: TabConfigType;
}
export interface ClockType {
  name: string;
}
