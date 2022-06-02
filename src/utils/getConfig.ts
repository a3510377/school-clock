import { app } from 'electron';
import fs from 'fs';
import path, { dirname } from 'path';

export const dataPath = app.getPath('userData');

/** get file path | 獲取檔案路徑 */
export const getFilePath = (...paths: string[]) => {
  return path.join(dataPath, ...paths);
};

/** read file | 讀取檔案 */
export const readFileSync = (fileName: fs.PathLike) => {
  try {
    const data = fs.readFileSync(fileName).toString();
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  } catch {
    return null;
  }
};

/** write file | 寫入檔案 */
export const writeFileSync = (
  fileName: fs.PathLike,
  data: string | NodeJS.ArrayBufferView
) => {
  try {
    fs.writeFileSync(
      fileName,
      typeof data === 'object' ? JSON.stringify(data) : data
    );
    return true;
  } catch {
    return null;
  }
};

/** write and write file | 讀取及寫入檔案 */
export const readWriteSync = (
  fileName: string,
  callback: (data: unknown) => unknown
) => {
  let data = null;
  try {
    fs.mkdirSync(dirname(fileName), { recursive: true });
  } finally {
    data = JSON.stringify({});
    fs.writeFileSync(fileName, data);
  }
  if (data === null) data = readFileSync(fileName);

  writeFileSync(fileName, <string>callback(data));
};
