export type Bit2 = '0' | '1';

export interface BaseConfigType {
  /** repeat | 重複 */
  repeat: boolean;
  /** week | 星期 */
  weeks: boolean[];
  /** enable | 是否啟用 */
  enable: boolean;
}
export interface ClockConfigType extends BaseConfigType {
  /** audio path | 音樂路徑 */
  audio: string;
  /** play once | 不重複 */
  once: boolean;
}
export type TabConfigType = BaseConfigType;

export interface TabType {
  id: string;
  name: string;
  config?: TabConfigType;
}
export interface ClockType {
  name: string;
}
