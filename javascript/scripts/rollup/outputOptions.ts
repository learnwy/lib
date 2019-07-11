// @ts-ignore
// import { file } from "@learnwy/node";
import { ModuleFormat, OutputOptions } from "rollup";

import { ProjectBundle, projectBundles } from "../../config/config";
import { cwd } from "../../config/env";

// const { resolve } = file;
import { resolve } from "path";

export async function getAllOutputOptions(): Promise<OutputOptions[][]> {
    return projectBundles.map((projectBundle: ProjectBundle): OutputOptions[] => {
        return projectBundle.format.map((format: ModuleFormat): OutputOptions => {
            return {
                file: resolve(cwd, "./build/", projectBundle.name, "index." + format + ".js"),
                format,
                name: 'learnwy_' + projectBundle.name,
                globals: projectBundle.globals,
                sourcemap: true,
            };
        });
    });
}

const allOutputOptions: OutputOptions[] = [
    {
        // core output options
        // dir,
        // file,
        // format, // required
        // globals,
        // name,

        // // advanced output options
        // assetFileNames,
        // banner,
        // chunkFileNames,
        // compact,
        // entryFileNames,
        // extend,
        // footer,
        // interop,
        // intro,
        // outro,
        // paths,
        // sourcemap,
        // sourcemapExcludeSources,
        // sourcemapFile,
        // sourcemapPathTransform,

        // // danger zone
        // amd,
        // dynamicImportFunction,
        // esModule,
        // exports,
        // freeze,
        // indent,
        // namespaceToStringTag,
        // noConflict,
        // preferConst,
        // strict
    },
];
