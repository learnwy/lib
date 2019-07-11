// @ts-ignore
import { file } from "@learnwy/node";
import { dirname, resolve } from "path";
import { InputOptions, OutputOptions, rollup, RollupBuild } from "rollup";

import { ProjectBundle, projectBundles } from "../config/config";
import { cwd } from "../config/env";

import { getAllInputOptions } from "./rollup/inputOptions";
import { getAllOutputOptions } from "./rollup/outputOptions";
const { asyncCopyFile, asyncMkdir, asyncStat } = file;

async function asyncMkdirp(dirPath: string): Promise<any> {
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
          throw new Error("create path %s:is a file" + dirPath);
        }
        break;
    }
  }
  return rt;
}

export async function buildAll() {
  const inputOptions = await getAllInputOptions();
  const outputOptions = await getAllOutputOptions();
  await Promise.all(inputOptions.map(async (inputOption: InputOptions, index) => {
    let bundle: RollupBuild;
    try {
      bundle = await rollup(inputOption);
    } catch (e) {
      console.error("input error", inputOption.input, e);
    }
    await Promise.all(outputOptions[index].map(async (outputOption: OutputOptions) => {
      try {
        await bundle.write(outputOption);
      } catch (e) {
        console.error("output error", inputOption.input, e);
      }
    }));
  }));

  await Promise.all(projectBundles.map(async (projectBundle) => {
    await asyncCopyFile(
      resolve(cwd, "packages/", projectBundle.name, "package.json"),
      resolve(cwd, "./build/", projectBundle.name, "./package.json"),
    );
  }));
  await Promise.all(projectBundles.map(async (projectBundle: ProjectBundle) => {
    await asyncMkdirp(resolve(cwd, "./build/node_modules/", projectBundle.name));
    await asyncCopyFile(
      resolve(cwd, "packages", projectBundle.name, "package.json"),
      resolve(cwd, "build/node_modules", projectBundle.name, "package.json"),
    );
    await asyncCopyFile(
      resolve(cwd, "build", projectBundle.name, projectBundle.entry),
      resolve(cwd, "build/node_modules", projectBundle.name, projectBundle.entry),
    );
    await asyncCopyFile(
      resolve(cwd, "build", projectBundle.name, projectBundle.entry + '.map'),
      resolve(cwd, "build/node_modules", projectBundle.name, projectBundle.entry + '.map'),
    );
  }));
}

buildAll().catch((err) => {
  console.error(err);
});
