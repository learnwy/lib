// babel-preset-es2015-rollup

export async function getBabelConfig() {
    return {
        presets: [
            "@babel/preset-env",
            "@babel/typescript",
        ],
    };
}
