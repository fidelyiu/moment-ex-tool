import toMoment from "../to/to-moment";

/**
 * 获取毫秒时间戳
 *
 * 如果你要获取秒数时间戳，请使用`moment().unix()`
 *
 * 如果是非法参数，则会返回NaN
 */
export default function getTime(inp?: moment.MomentInput, strict?: boolean | undefined): number {
    const date = toMoment(inp, strict);
    return date.toDate().getTime();
}
