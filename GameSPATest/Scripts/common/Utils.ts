import moment = require('moment');

module Utils {
    export function getFormatedDateWithTime(dateString: string) {
        return moment(moment(dateString).format('YYYY-MM-DD HH:mm:ss')).toDate();
    }

}
export = Utils;