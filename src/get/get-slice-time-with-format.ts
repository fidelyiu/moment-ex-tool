import getAsc from "./get-asc";

import type { SliceNumWithFormatOpt } from "../types";

/**
 * 判断`t1`、`t2`之间有多少时间切片，会将`t1`进行`startOf`处理
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
export default function getSliceTimeWithFormat(t1: moment.Moment, t2: moment.Moment, opt?: Partial<SliceNumWithFormatOpt>): Array<[moment.Moment, moment.Moment]> {
    let includEnd = true;
    let startUnit: moment.unitOfTime.StartOf = "d";
    let silceNum: moment.DurationInputArg1 = 1;
    let addUnit: moment.DurationInputArg2 = "d";
    let exclude: (startTime?: moment.Moment, endTime?: moment.Moment) => boolean = () => false;
    if (opt) {
        if (typeof opt.includEnd === "boolean") {
            includEnd = opt.includEnd;
        }
        if (opt.startUnit) {
            startUnit = opt.startUnit;
        }
        if (opt.silceNum) {
            silceNum = opt.silceNum;
        }
        if (opt.addUnit) {
            addUnit = opt.addUnit;
        }
        if (opt.exclude && typeof opt.exclude === "function") {
            exclude = opt.exclude;
        }
    }
    const [tempStartTime, endTime] = getAsc([t1, t2]);
    if (!tempStartTime || !endTime) return [];
    const startTime = tempStartTime.startOf(startUnit);
    if (startTime.isSame(endTime)) {
        if (includEnd) {
            return [[startTime.clone(), startTime.clone().add(silceNum, addUnit)]];
        } else {
            return [];
        }
    }
    const result: Array<[moment.Moment, moment.Moment]> = [];
    let lastTime;
    while (startTime.isBefore(endTime)) {
        result.push([startTime.clone(), startTime.clone().add(silceNum, addUnit)]);
        lastTime = startTime.clone().add(silceNum, addUnit);
        startTime.add(silceNum, addUnit);
    }
    if (includEnd && lastTime && lastTime.isSameOrBefore(endTime)) {
        result.push([startTime.clone(), startTime.clone().add(silceNum, addUnit)]);
    }
    return result.filter(([startDate, endDate]) => !exclude(startDate, endDate));
}
