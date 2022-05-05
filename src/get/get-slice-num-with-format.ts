import getSliceTimeWithFormat from "./get-slice-time-with-format";

import type { SliceOpt } from "../types";

/**
 * 判断`t1`、`t2`之间有多少时间切片数量，会自动对`t1`进行`startOf`处理，默认'd'。
 */
export default function getSliceNumWithFormat(t1: moment.Moment, t2: moment.Moment, opt?: Partial<SliceOpt>): number {
    return getSliceTimeWithFormat(t1, t2, opt).length;
}
