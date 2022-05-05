import getSliceTime from "./get-slice-time";

import type { SliceOpt } from "../types";

/**
 * 判断`t1`、`t2`之间有多少时间切片，会自动对`t1`进行`startOf`处理，默认'd'。
 *
 * 返回时间段数组
 *
 * `2022-10-11~2022-10-13`
 * ```
 * [
 *  ['2022-10-11 00:00:00:000'~'2022-10-12 00:00:00:000'],
 *  ['2022-10-12 00:00:00:000'~'2022-10-13 00:00:00:000'],
 *  ['2022-10-13 00:00:00:000'~'2022-10-14 00:00:00:000'],
 * ]
 * ```
 */
export default function getSliceTimeWithFormat(t1: moment.Moment, t2: moment.Moment, opt?: Partial<SliceOpt>): Array<[moment.Moment, moment.Moment]> {
    return getSliceTime(t1, t2, Object.assign({ startUnit: "d" }, opt));
}
