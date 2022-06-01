import { defineStore } from 'pinia';

import { ThemeEnum } from '@/enums/app';
import { DefaultThemeMode } from '@/settings/default';

export interface AppStore {
  /** theme modes | 主題模式 */
  theme?: ThemeEnum;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppStore => ({
    theme: void 0,
  }),
  getters: {
    getThemeMode(): ThemeEnum {
      return this.theme || DefaultThemeMode;
    },
  },
  actions: {
    /** set theme modes | 設定主題模式 */
    setThemeMode(theme: ThemeEnum | boolean | string): void {
      const schemes = <[keyof typeof ThemeEnum]>Object.keys(ThemeEnum);
      const html = document.querySelector('html');

      let editTheme: ThemeEnum = DefaultThemeMode;
      if (typeof theme === 'string' && (<string[]>schemes).includes(theme)) {
        localStorage.setItem('theme', theme);
        editTheme = ThemeEnum[<keyof typeof ThemeEnum>theme];
      } else if (typeof theme === 'boolean') {
        editTheme = theme ? ThemeEnum.DARK : ThemeEnum.LIGHT;
      } else localStorage.removeItem('theme');

      for (const _theme of Object.keys(ThemeEnum)) {
        document.body.classList.remove(_theme);
      }

      html?.setAttribute('data-theme', editTheme);
      html?.classList.add(editTheme);

      this.theme = editTheme;
    },
  },
});
