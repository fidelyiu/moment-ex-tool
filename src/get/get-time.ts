import moment from "moment";

/**
 * 获取毫秒时间戳
 *
 * 如果你要获取秒数时间戳，请使用`moment().unix()`
 *
 * 如果是非法参数，则会返回NaN
 */
export default function getTime(date: moment.Moment): number {
    return date.toDate().getTime();
}
