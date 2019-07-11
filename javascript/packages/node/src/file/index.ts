// @ts-ignore
import {string} from '@learnwy/common'
import {copyFile, mkdir, readdir, stat, writeFile} from "fs";
import {dirname, resolve} from "path";

import { promisify } from "../utils/index.ts";

const {formatString} = string;

export const asyncMkdir = promisify(mkdir);
export const asyncStat = promisify(stat);
export const asyncWriteFile = promisify(writeFile);
export const asyncReaddir = promisify(readdir);
export const asyncCopyFile = promisify(copyFile);

async function asyncMkdirp(dirPath: string): Promise<void> {
  let rt;
  try {
    rt = await asyncMkdir(dirPath);
  } catch (err) {
    switch (err.code) {
      case "ENOENT":
        // dirPath's parent not exists
        rt = await asyncMkdirp(dirname(dirPath)).then(() => asyncMkdirp(dirPath));
        break;
      default:
        const st = await asyncStat(dirPath);
        if (!st.isDirectory) {
          throw new Error(formatString("create path %s:is a file", dirPath));
        }
        break;
    }
  }
  return rt;
}

export {
    resolve,
    dirname,
    mkdir,
    stat,
    writeFile,
    readdir,
    copyFile,
    asyncMkdirp,
};
