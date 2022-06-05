import type { DeepPartial } from './utils';

export type timeFormatType = `${string}:${string}`;

export interface BaseConfigType {
  /** repeat | 重複 */
  repeat: boolean;
  /** week | 星期 */
  weeks: number[];
}
export interface AlarmClockConfigType extends BaseConfigType {
  /** play once | 不重複 */
  once: boolean;
}
export type TabConfigType = BaseConfigType;

export interface TabType {
  /** id | ID */
  id: string;
  /** name | 名 */
  name: string;
  /** config | 設定 */
  config?: DeepPartial<TabConfigType>;
  /** alarm clocks | 鬧鐘 */
  AlarmClocks: AlarmClockType[];
  /** tab enable | 是否啟用 tab */
  enabled: boolean;
}
export interface AlarmClockType {
  /** alarm clock ID | 鬧鐘 ID */
  id: string;
  /** alarm clock name | 鬧鐘名 */
  name: string;
  /** alarm clock enable | 是否啟用鬧鐘 */
  enabled: boolean;
  /** alarm clock config | 鬧鐘設定 */
  config?: DeepPartial<AlarmClockConfigType>;
  time: timeFormatType;
  /** audio path | 音樂路徑 */
  audio: string;
}
