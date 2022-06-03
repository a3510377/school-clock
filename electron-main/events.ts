import sound from 'sound-play';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from 'electron';

import { AlarmClockType } from '../types/data';

ipcMain.on('play-sound', (_, audio: string, repeat = false) => {
  sound
    .play(audio)
    .then(() => repeat && sound.play(audio))
    // TODO add error handler
    .catch(() => ({}));
});
ipcMain.on('alarm-clock', (_, alarmClock: AlarmClockType) => {
  // TODO add 通知
  ipcMain.emit('play-sound', alarmClock.audio, alarmClock.config?.repeat);
});
