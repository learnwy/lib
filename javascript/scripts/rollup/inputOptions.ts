// @ts-ignore
// import { file } from "@learnwy/node";
import { InputOptions } from "rollup";

// @ts-ignore
import rollupBabel from "rollup-plugin-babel";
// @ts-ignore
import rollupTypescript from "rollup-plugin-typescript";
import builtins from "rollup-plugin-node-builtins";
import globals from 'rollup-plugin-node-globals';

import { ProjectBundle, projectBundles } from "../../config/config";
import { cwd } from "../../config/env";

import { getBabelConfig } from "../babel/babel.config";

// const { resolve } = file;
import { resolve } from "path";

export async function getAllInputOptions(): Promise<InputOptions[]> {
    const babelConfig = await getBabelConfig();
    return projectBundles.map((projectBundle: ProjectBundle): InputOptions => {
        return {
            input: resolve(cwd, "./packages/", projectBundle.name, "./src/index.ts"),
            plugins: [
                rollupTypescript(),
                rollupBabel(babelConfig),
                globals(),
                builtins(),
            ],
            external: projectBundle.external,
        };
    });
}

const allInputOptions: InputOptions[] = [
    {
        // core input options
        // external,
        // input, // required
        // plugins,

        // // advanced input options
        // cache,
        // inlineDynamicImports,
        // manualChunks,
        // onwarn,
        // preserveModules,
        // strictDeprecations,

        // // danger zone
        // acorn,
        // acornInjectPlugins,
        // context,
        // moduleContext,
        // preserveSymlinks,
        // shimMissingExports,
        // treeshake,

        // // experimental
        // chunkGroupingSize,
        // experimentalCacheExpiry,
        // experimentalOptimizeChunks,
        // experimentalTopLevelAwait,
        // perf,
    },
];

export default allInputOptions;
