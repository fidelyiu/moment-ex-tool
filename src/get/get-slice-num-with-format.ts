import getSliceTimeWithFormat from "./get-slice-time-with-format";

import type { SliceNumWithFormatOpt } from "../types";

/**
 * 判断`t1`、`t2`之间有多少时间切片数量，会将`t1`进行`startOf`处理
 */
export default function getSliceNumWithFormat(t1: moment.Moment, t2: moment.Moment, opt?: Partial<SliceNumWithFormatOpt>): number {
    return getSliceTimeWithFormat(t1, t2, opt).length;
}
