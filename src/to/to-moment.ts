import moment from "moment";

/**
 * 解析字符串`'YYYY-MM-DD HH:mm:ss:SSS'`为Moment对象
 *
 * 该方法旨在于快速解析`toStr()`生成的字符串
 */
export default function toMoment(str: string): moment.Moment {
    return moment(str, "YYYY-MM-DD HH:mm:ss:SSS");
}
