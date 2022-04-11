import getAsc from "./get-asc";

import type { SliceNumOpt } from "../types";
import moment from "moment";

/**
 * 判断`t1`、`t2`之间有多少时间切片
 *
 * 返回时间段数组
 *
 * `2022-10-11~2022-10-13`
 * ```
 * [
 *  ['2022-10-11'~'2022-10-12'],
 *  ['2022-10-12'~'2022-10-13'],
 *  ['2022-10-13'~'2022-10-14'],
 * ]
 * ```
 */
export default function getSliceTime(t1: moment.Moment, t2: moment.Moment, opt?: Partial<SliceNumOpt>): Array<[moment.Moment, moment.Moment]> {
    let includEnd = true;
    let silceNum: moment.DurationInputArg1 = 1;
    let addUnit: moment.DurationInputArg2 = "d";
    if (opt) {
        if (typeof opt.includEnd === "boolean") {
            includEnd = opt.includEnd;
        }
        if (opt.silceNum) {
            silceNum = opt.silceNum;
        }
        if (opt.addUnit) {
            addUnit = opt.addUnit;
        }
    }
    const [startTime, endTime] = getAsc([t1, t2]);
    if (!startTime || !endTime || startTime.isSame(endTime)) return [];
    let lastTime;
    const result: Array<[moment.Moment, moment.Moment]> = [];
    while (startTime.isBefore(endTime)) {
        result.push([startTime.clone(), startTime.clone().add(silceNum, addUnit)]);
        lastTime = startTime.clone().add(silceNum, addUnit);
        startTime.add(silceNum, addUnit);
    }
    if (includEnd && lastTime && lastTime.isSameOrBefore(endTime)) {
        result.push([startTime.clone(), startTime.clone().add(silceNum, addUnit)]);
    }
    return result;
}
