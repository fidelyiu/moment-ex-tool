import moment from "moment";
import { SliceStampOpt } from "../types";
import getTime from "./get-time";

export default function getSliceTimeStamp(t1: number, t2: number, opt?: Partial<SliceStampOpt>): Array<[number, number]> {
    let includEnd = true;
    let isSameEnd = false;
    let startUnit: moment.unitOfTime.StartOf | undefined = undefined;
    let addNum = 86400000;
    let exclude: (startTime?: number, endTime?: number) => boolean = () => false;
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
        if (opt.addNum) {
            addNum = opt.addNum;
        }
        if (opt.exclude && typeof opt.exclude === "function") {
            exclude = opt.exclude;
        }
    }
    if (t1 > t2) {
        const c = t2;
        t2 = t1;
        t1 = c;
    }
    if (isNaN(+t1) || isNaN(+t2)) return [];
    if (startUnit) {
        t1 = getTime(moment(t1).startOf(startUnit));
    }
    const result: Array<[number, number]> = [];
    while (t1 <= t2) {
        const endT = t1 + addNum;
        const item: [number, number] = [t1, endT];
        t1 = endT;
        if (t1 >= t2) {
            if (includEnd) {
                result.push(item);
            }
            if (!isSameEnd) break;
        }
        if (t1 === t2) {
            result.push(item);
        }
    }
    return result.filter(([startDate, endDate]) => !exclude(startDate, endDate));
}
