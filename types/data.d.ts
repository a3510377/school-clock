export type Bit2 = '0' | '1';

export interface BaseConfigType {
  /** repeat | 重複 */
  repeat: boolean;
  /** week | 星期 */
  weeks: boolean[];
}
export interface AlarmClockConfigType extends BaseConfigType {
  /** audio path | 音樂路徑 */
  audio: string;
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
  config?: TabConfigType;
}
export interface AlarmClockType {
  /** alarm clock name | 鬧鐘名 */
  name: string;
  /** alarm clock enable | 是否啟用鬧鐘 */
  enable: boolean;
  /** alarm clock config | 鬧鐘設定 */
  config: AlarmClockConfigType;
}
