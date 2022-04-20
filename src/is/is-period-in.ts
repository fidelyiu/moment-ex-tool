import moment from "moment";

import type { InType } from "../types";
import isIn from "./is-in";

/**
 * 判断`t1`、`t2`是否包含在`t3`、`t4`中
 */
export default function isPeriodIn(t1: moment.Moment, t2: moment.Moment, t3: moment.Moment, t4: moment.Moment, inType: InType = "[]"): boolean {
    return isIn(t1, t3, t4, inType) && isIn(t2, t3, t4, inType);
}
