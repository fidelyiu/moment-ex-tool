import isIntersect from "./is-intersect";
import moment from "moment";

/**
 * 时间段是否相交（包含端点相交）
 */
export default function isIntersectSame(t1: moment.Moment, t2: moment.Moment, t3: moment.Moment, t4: moment.Moment): boolean {
    if (isIntersect(t1, t2, t3, t4)) return true;
    const x1 = moment(t1);
    const x2 = moment(t2);
    const x3 = moment(t3);
    const x4 = moment(t4);
    if (!x1.isValid() || !x2.isValid() || !x3.isValid() || !x4.isValid()) return false;
    return x1.isSame(x3) || x3.isSame(x2) || (x1.isSame(x4) && x4.isSame(x2));
}
