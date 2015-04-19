define(["require", "exports", 'moment'], function (require, exports, moment) {
    var Utils;
    (function (Utils) {
        function getFormatedDateWithTime(dateString) {
            return moment(moment(dateString).format('YYYY-MM-DD HH:mm:ss')).toDate();
        }
        Utils.getFormatedDateWithTime = getFormatedDateWithTime;
        function appendNewLine(koString, newLine, includeTimeStamp) {
            if (includeTimeStamp === void 0) { includeTimeStamp = true; }
            if (includeTimeStamp) {
                newLine = (moment().format('HH:mm:ss') + ' - ' + newLine);
                koString(newLine + '<br>' + koString());
            }
        }
        Utils.appendNewLine = appendNewLine;
    })(Utils || (Utils = {}));
    return Utils;
});
//# sourceMappingURL=Utils.js.map