function formatString(format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var argIndex = 0;
    return format.replace(/%(\d*)s/g, function (testStr, match /* , start, all */) {
        var padNum = +match;
        var ret;
        if (!padNum) {
            ret = args[argIndex];
        }
        else {
            ret = ("" + args[argIndex]).padEnd(padNum, " ");
        }
        argIndex++;
        return ret;
    });
}

var _string = /*#__PURE__*/Object.freeze({
    formatString: formatString
});

export { _string };
//# sourceMappingURL=index.esm.js.map
