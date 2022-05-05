import getAsc from "./get-asc";

import type { SliceOpt } from "../types";
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
export default function getSliceTime(t1: moment.Moment, t2: moment.Moment, opt?: Partial<SliceOpt>): Array<[moment.Moment, moment.Moment]> {
    let includEnd = true;
    let isSameEnd = false;
    let startUnit: moment.unitOfTime.StartOf | undefined = undefined;
    let silceNum: moment.DurationInputArg1 = 1;
    let addUnit: moment.DurationInputArg2 = "d";
    let exclude: (startTime?: moment.Moment, endTime?: moment.Moment) => boolean = () => false;
    if (opt) {
        if (typeof opt.includEnd === "boolean") {
            includEnd = opt.includEnd;
        }
        if (typeof opt.isSameEnd === "boolean") {
            isSameEnd = opt.isSameEnd;
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
    let startTime = tempStartTime;
    if (startUnit) {
        startTime = tempStartTime.startOf(startUnit);
    }
    const result: Array<[moment.Moment, moment.Moment]> = [];
    while (startTime.isSameOrBefore(endTime)) {
        const item: [moment.Moment, moment.Moment] = [startTime.clone(), startTime.clone().add(silceNum, addUnit)];
        startTime.add(silceNum, addUnit);
        if (startTime.isSameOrAfter(endTime)) {
            if (includEnd) {
                result.push(item);
            }
            if (!isSameEnd) break;
        }
        if (startTime.isBefore(endTime)) {
            result.push(item);
        }
    }
    return result.filter(([startDate, endDate]) => !exclude(startDate, endDate));
}
