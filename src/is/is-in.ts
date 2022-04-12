import moment from "moment";

import type { InType } from "../types";

/**
 * 判断`t1`是否包含在`t2`、`t3`中
 */
export default function isIn(t1: moment.Moment, t2: moment.Moment, t3: moment.Moment, inType: InType): boolean {
    const d1 = moment(t1);
    const x1 = moment(t2);
    const x2 = moment(t3);
    if (x1.isValid() || x2.isValid() || d1.isValid()) return false;
    const l1 = x1.isBefore(x2) ? x1 : x2;
    const l2 = x1.isBefore(x2) ? x2 : x1;
    switch (inType) {
        case "()":
            return l1.isBefore(d1) && d1.isBefore(l2);
        case "(]":
            return l1.isBefore(d1) && d1.isSameOrBefore(l2);
        case "[)":
            return l1.isSameOrBefore(d1) && d1.isBefore(l2);
        case "[]":
            return l1.isSameOrBefore(d1) && d1.isSameOrBefore(l2);
        default:
            return false;
    }
}
