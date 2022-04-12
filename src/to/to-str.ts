import moment from "moment";

/**
 * 将时间适配为`'YYYY-MM-DD HH:mm:ss:SSS'`
 *
 * 如果是无效参数，则会返回`'Invalid date'`
 *
 * 该方法旨在于快速显示可读的时间格式，如果需要自定义还是请使用`moment().format()`
 */
export default function toStr(date: moment.Moment): string {
    return date.format("YYYY-MM-DD HH:mm:ss:SSS");
}
