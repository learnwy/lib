export const projectNames = [
    "common",
    "web",
    "node",
];

export const bundleTypes = [];

import { GlobalsOption, ModuleFormat } from 'rollup';

export interface ProjectBundle {
    name: string;
    format: ModuleFormat[];
    external?: string[];
    globals?: GlobalsOption;
    entry: string;
}

export const projectBundles: ProjectBundle[] = [
    {
        name: "common",
        format: ["cjs", "umd", "amd", "esm"],
        entry: "index.esm.js",
        external: [
            "@learnwy/common",
            "@learnwy/node",
            "@learnwy/web",
        ],
        globals: {
            '@learnwy/common': 'learnwy_common',
            '@learnwy/node': 'learnwy_node',
            '@learnwy/web': 'learnwy_web',
        },
    },
    {
        name: "web",
        format: ["umd", "amd", "esm"],
        entry: "index.umd.js",
        external: [
            "@learnwy/common",
            "@learnwy/node",
            "@learnwy/web",
        ],
        globals: {
            '@learnwy/common': 'learnwy_common',
            '@learnwy/node': 'learnwy_node',
            '@learnwy/web': 'learnwy_web',
        },
    },
    {
        name: "node",
        format: ["cjs", "umd", "amd", "esm"],
        entry: "index.cjs.js",
        external: [
            "fs", "util",
            "@learnwy/common",
            "@learnwy/node",
            "@learnwy/web",
        ],
        globals: {
            fs: "fs",
            util: "utils",
            '@learnwy/common': 'learnwy_common',
            '@learnwy/node': 'learnwy_node',
            '@learnwy/web': 'learnwy_web',
        },
    },
];
