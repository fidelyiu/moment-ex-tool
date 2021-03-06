import getSliceTime from "./get-slice-time";

import type { SliceOpt } from "../types";

/**
 * 判断`t1`、`t2`之间有多少时间切片数量
 */
export default function getSliceNum(t1: moment.Moment, t2: moment.Moment, opt?: Partial<SliceOpt>): number {
    return getSliceTime(t1, t2, opt).length;
}
