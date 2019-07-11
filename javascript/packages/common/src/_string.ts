
export function formatString(format: string, ...args: string[]) {
    let argIndex = 0;
    return format.replace(/%(\d*)s/g, (testStr, match/* , start, all */) => {
        const padNum = +match;
        let ret;
        if (!padNum) {
            ret = args[argIndex];
        } else {
            ret = ("" + args[argIndex]).padEnd(padNum, " ");
        }
        argIndex++;
        return ret;
    });
}
